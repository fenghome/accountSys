const express = require('express');
const router = express.Router();
const Settlement = require('../models/settlement');
const Orders = require('../models/orders');
const Storage = require('../models/storage');
const Product = require('../models/products');
const { getOrderNumber } = require('../utils/utils');
function getResource(query, cb) {
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
    .exec(function (err, storageProducts) {
      Orders.aggregate()
        .match(query)
        .unwind('products')
        .group({
          _id: "$products.productId",
          productName: { $last: "$products.productName" },
          productUnit: { $last: "$products.productUnit" },
          outAmount: { $sum: "$products.quantity" },
          salePrice: { $sum: "$products.amount" },
        })
        .project({
          productName: 1,
          productUnit: 1,
          outAmount: 1,
          salePrice: 1,
          averagePrice: { $divide: ['$salePrice', '$outAmount'] }
        })
        .exec(function (err, orderProducts) {
          Product.find(query, function (err, products) {
            let productCodeMap = {};
            let productTypeMap = {};
            products.forEach(function (product) {
              productCodeMap[product._id] = product.productCode;
              productTypeMap[product._id] = product.productType;
            })

            let allProducts = [...orderProducts, ...storageProducts];
            let productGroup = {}
            allProducts.forEach(function (product) {
              let id = product._id;
              productGroup[id] = {
                ...productGroup[id],
                ...product,
                productCode: productCodeMap[id],
                productType: productTypeMap[id],
              };
              productGroup[id].inAmount = productGroup[id].inAmount || 0;
              productGroup[id].outAmount = productGroup[id].outAmount || 0;
              productGroup[id].amount = productGroup[id].inAmount - productGroup[id].outAmount;
              productGroup[id].stockFunds = productGroup[id].amount * productGroup[id].averagePrice;
            });
            const resProducts = Object.keys(productGroup)
              .map(function (key) {
                return productGroup[key];
              })
              .sort(function (a, b) {
                return parseInt(a.productCode.substr(-3)) - parseInt(b.productCode.substr(-3));
              })

            cb(resProducts);
          })
        })
    })
}
router.route('/')
  .get(function (req, res, next) {
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
        getResource(query, function (resProducts) {
          res.send({
            success: true,
            resProducts: resProducts.filter(function (product) {
              return req.query.productId ? req.query.productId == product._id : product
            })
          })
        })
      }
    });
  })
  .post(function (req, res, next) {
    const userId = req.session.userInfo._id;
    Settlement.find({ userId: userId })
      .sort('-createInstance')
      .exec(function (err, settlements) {
        if (err) {
          return res.send({
            success: false,
            err
          })
        }
        let query = { userId: userId };
        if (settlements.length > 0) {
          query.createInstance = { "$gte": settlements[0].createInstance }
        };
        getResource(query, function (resProducts) {
          Orders.find({ userId: userId }).sort({ orderNumber: 1 }).exec(function (err, orders) {
            let products = resProducts.map(function (product, index) {
              return {
                remarks: '结算商品',
                amount: 0,
                price: 0,
                productUnit: product['productUnit'],
                quantity: product['amount'],
                productName: product['productName'],
                productId: product['_id'],
                key: index
              };
            });

            const maxNumber = parseInt(orders[orders.length - 1].orderNumber.substr(-4)) + 1;
            const orderNumber = getOrderNumber(maxNumber);
            const order = new Orders({
              sequence: null,
              orderNumber,
              customerId: '',
              totalAmount: 0,
              paymentAmount: 0,
              mem: '结算生成的出货单，所以出货单金额及付款金额均为0元',
              createInstance: new Date(),
              products: products,
              userId: userId
            });
            let productStocks = products
              .filter(function(product){
                return product.productId != '';
              })
              .map(function(product){

              })
            res.send({
              order
            })
          })
        });
      })
  })


module.exports = router;
