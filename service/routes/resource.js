const express = require('express');
const router = express.Router();
const Settlement = require('../models/settlement');
const Orders = require('../models/orders');
const Storage = require('../models/storage');
const Product = require('../models/products');

router.route('/').get(function (req, res, next) {
  const userId = req.session.userInfo._id;
  const { productId } = req.query;
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
      Orders.find(query,function(err,orders){
        let orderProducts = [];
        orders.forEach(function(order){
          order.forEach(function(product){
            orderProducts.push(product);
          })
        });

        Storage.find(query,function(err,storages){
          let storageProducts = [];
          storages.forEach(function(storage){
            storage.forEach(function(product){
              storageProducts.push(product);
            })
          });

          Product.find({},function(err,products){
            let productCodeMap = {};
            products.forEach(function(product){
              productCodeMap[product._id] = product.productCode;
            });

            let concatProducts = orderProducts.concat(storageProducts);
            let resProducts = {};
            concatProducts.forEach(function(product){
              const id = product.productId;
              resProducts[id] = {
                productCode:productCodeMap[id],
                productName:product.productName,
                productType:product.productType
              };
              resProducts[id].inAmount = resProducts[id].inAmount || 0;
              resProducts[id].inAmount += product.amount;
            })
          })
        });


        products.forEach(function(product){
          productsMap[product.productId] = productsMap[product.productId] || {};
          productsMap[product.productId] = {
            productCode:product
          }
        })
      })
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









     });
    }
  })
})

module.exports = router;
