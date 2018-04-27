const express = require('express');
const router = express.Router();
const Settlement = require('../models/settlement');
const Orders = require('../models/orders');
const Storage = require('../models/storage');
const Product = require('../models/products');

router.route('/').get(function (req, res, next) {
  const userId = req.session.userInfo._id;
  Settlement.find({ userId: userId }, function (err, docs) {
    if (err) {
      res.send({
        success: false,
        err: err
      })
    } else {
      let query = { userId: userId };
      if (docs.length > 0) {
        query.createInstance = { '$gte': docs[0].createInstance }
      }

      Storage.aggregate()
        .match(query)
        .unwind('products')
        .group({
          _id: "$products.productId",
          productName: { $last: "$products.productName" },
          inAmount: { $sum: "$products.quantity" },
          productUnit: { $last: "$products.productUnit" },
          stockPrice: { $sum: "$products.amount" }
        })
        .exec(function (err, docs) {
          res.send({
            docs
          })
        })


      // let ordersProudcts = [];
      // Orders.find(query, function (err, orders) {
      //   if (err) {
      //     return res.send({
      //       success: false,
      //       err: err
      //     })
      //   }
      //   orders.forEach(function (order) {
      //     order.products.forEach(function (product) {
      //       let obj = {
      //         productId: product.productId,
      //         productName: product.productName,
      //         productUnit: product.productUnit,
      //         outAmount: product.quantity,
      //         salePrice: product.amount
      //       }
      //       ordersProudcts.push(obj);
      //     })
      //   });

      //   let storagesProducts = [];
      //   Storage.find(query, function (err, storages) {
      //     storages.forEach(function (storage) {
      //       storage.products.forEach(function (product) {
      //         let obj = {
      //           productId: product.productId,
      //           productName: product.productName,
      //           productUnit: product.productUnit,
      //           inAmount: product.quantity,
      //           stockPrice: product.amount
      //         }
      //         storagesProducts.push(obj);
      //       })
      //     });

      //     let productCodeMap = {};
      //     let productTypeMap = {};
      //     Product.find({}, function (err, products) {
      //       if (err) {
      //         return res.send({
      //           success: false,
      //           err
      //         })
      //       }

      //       products.forEach(function (product) {
      //         productCodeMap[product._id] = product.productCode;
      //         productTypeMap[product._id] = product.productType;
      //       });

      //       const allProducts = ordersProudcts.concat(storagesProducts);
      //       let productGroup = {};
      //       allProducts.forEach(function (product) {
      //         let id = product.productId;
      //         productGroup[id] = productGroup[id] || {
      //           productCode: '',
      //           productName: '',
      //           productType: '',
      //           productUnit: '',
      //           inAmount: 0,
      //           outAmount: 0,
      //           amount: 0,
      //           salePrice: 0,
      //           averagePrice: 0,
      //           stockFunds: 0
      //         };
      //         productGroup[id] = {
      //           productCode: productCodeMap[id],
      //           productName: product.productName,
      //           productType: productTypeMap[id],
      //           productUnit: product.productUnit,
      //           inAmount: product.inAmount ? parseInt(product.inAmount) + productGroup[id].inAmount : productGroup[id].inAmount,
      //           outAmount: product.outAmount ? parseInt(product.outAmount) + productGroup[id].outAmount : productGroup[id].outAmount,
      //           salePrice: product.salePrice ? parseInt(product.salePrice) + productGroup[id].salePrice : productGroup[id].salePrice
      //         };
      //         productGroup[id].amount = productGroup[id].inAmount - productGroup[id].outAmount;
      //         productGroup[id].averagePrice = productGroup[id].outAmount != 0 ? productGroup[id].salePrice / productGroup[id].outAmount : 0;
      //         productGroup[id].stockFunds = productGroup[id].amount * productGroup[id].averagePrice;
      //       });

      //       const resProducts = Object.keys(productGroup)
      //         .map(function (key) {
      //           return { ...productGroup[key], productId: key };
      //         })
      //         .sort(function (a, b) {
      //           return parseInt(a.productCode.substr(-3)) - parseInt(b.productCode.substr(-3));
      //         })
      //         .filter(function (item) {
      //           return req.query.productId ? item.productId == req.query.productId : item
      //         });
      //       return res.send({
      //         success: true,
      //         resProducts
      //       })
      //     });
      //   })
      // });







    }
  });
});

// Orders.find(query, function (err, orders) {
//   if (!err) {
//     let productGroup = {};
//     orders.forEach(function (order) {
//       order.products.forEach(function (product) {
//         const productId = product.productId;
//         productGroup[productId] = productGroup[productId] || [];
//         productGroup[productId] = [...productGroup[productId], product];
//       })
//     });
//     let orderComputerProducts = [];
//     Object.keys(productGroup).forEach(function (key) {
//       let computerObj = { _id: key, outAmount: 0, salePrice: 0, averagePrice: 0 }
//       productGroup[key].forEach(function (product) {
//         computerObj.outAmount += parseInt(product.quantity);
//         computerObj.salePrice += parseInt(product.amount);
//       });
//       computerObj.averagePrice = computerObj.salePrice / computerObj.outAmount;
//       orderComputerProducts.push(computerObj);
//     });

//     Storage.find(query, function (err, storages) {
//       if (!err) {
//         let storageGroup = {};
//         storages.forEach(function (storage) {
//           storage.products.forEach(function (product) {
//             // const productId = product.productId;
//             storageGroup[product.productId] = storageGroup[product.productId] || [];
//             storageGroup[product.productId].push(product);
//           })
//         });
//         let storageComputerProducts = Object.keys(storageGroup).map((function (key) {
//           let obj = {
//             _id: key,
//             inAmount: 0,
//             purchasePrice: 0,
//             storageAveragePrice: 0,
//             productUnit: storageGroup[key][0].productUnit
//           };
//           storageGroup[key].forEach(function (product) {
//             obj.inAmount += parseInt(product.quantity);
//             obj.purchasePrice += parseInt(product.amount);
//           })
//           obj.storageAveragePrice = obj.purchasePrice / obj.inAmount;
//           return obj;
//         }));

//         Product.find({}, function (err, docs) {
//           if (!err) {
//             let productNameMap = {};
//             let productCodeMap = {};
//             let productTypeMap = {};
//             docs.forEach(function (product) {
//               productNameMap[product._id] = product.productName;
//               productCodeMap[product._id] = product.productCode;
//               productTypeMap[product._id] = product.productType;
//             });
//             concatProducts = orderComputerProducts.concat(storageComputerProducts);
//             let concatProductGroup = {};
//             concatProducts.forEach(function (item) {
//               concatProductGroup[item._id] = concatProductGroup[item._id] || {};
//               concatProductGroup[item._id] = { ...concatProductGroup[item._id], ...item };
//             });
//             ProductsResoult = Object.keys(concatProductGroup).map(function (key) {
//               const item = concatProductGroup[key];
//               return {
//                 productCode: productCodeMap[item._id],
//                 prodcutName: productNameMap[item._id],
//                 productType: productTypeMap[item._id],
//                 inAmount:item.inAmount,
//                 outAmount: item.outAmount,
//                 amount: item.inAmount - item.outAmount,
//                 averagePrice: item.averagePrice || item.storageAveragePrice,
//                 salePrice: item.salePrice || 0,
//                 profitPrice: item.salePrice - item.purchasePrice,
//                 stockFunds: item.amount * item.averagePrice
//               }
//             })
//             res.send({
//               success:true,
//               ProductsResoult
//             })
//           };
//         })
//       }
//     });
//   }


module.exports = router;
