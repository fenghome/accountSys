const express = require('express');
const router = express.Router();
const Settlement = require('../models/settlement');
const Orders = require('../models/orders');

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
      Orders.find(query, function (err, orders) {
        if (!err) {
          let productGroup = {};
          let ppp = [];
          orders.forEach(function (order) {
            order.products.forEach(function (product) {
              const productId = product.productId;
              productGroup[productId] = productGroup[productId] || [];
              productGroup[productId] = [...productGroup[productId], product];
            })
          });
          let orderComputerProducts = [];
          Object.keys(productGroup).forEach(function (key) {
            let computerObj = { _id: key, outAmount: 0, salePrice: 0, averagePrice: 0 }
            productGroup[key].forEach(function (product) {
              computerObj.outAmount += product.quantity;
              computerObj.salePrice += product.amount;
            });
            computerObj.averagePrice = computerObj.salePrice / computerObj.outAmount;
          })
          res.send({
            products: productGroup
          })
        }
      })
    }
  })
})

module.exports = router;
