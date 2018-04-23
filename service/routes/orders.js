const express = require('express');
const router = express.Router();
const Order = require('../models/orders');

router.route('/')
  .get(function (req, res, next) {
    const userId = req.session.userInfo._id;
    const { timeRange, customerId, orderNumber, currentPage } = req.query;
    let query = { userId: userId };
    if (timeRange) {
      query.createInstance = { '$gte': timeRange[0], '$lte': timeRange[1] }
    }
    if (customerId) {
      query.customerId = customerId;
    }
    if (orderNumber) {
      query.orderNumber = new RegExp(orderNumber);
    }
    const limit = 2;
    const skip = (currentPage - 1) * limit;
    Order.count(query, function (err, count) {
      if (!err) {
        Order.find(query).skip(skip).limit(limit).exec(function (err, docs) {
          if (err) {
            return res.send({
              success: false,
              err: err
            })
          }
          res.send({
            success: true,
            orders: docs,
            total: count
          })
        })
      } else {
        res.send({
          success: false,
          err: err
        })
      }
    })

  })
  .post(function (req, res, next) {
    const userId = req.session.userInfo._id;
    let order = req.body;
    order.userId = userId;
    Order.create(order, function (err, docs) {
      if (err) {
        return res.send({
          success: false,
          err: err
        })
      }
      res.send({
        success: true,
        order: docs
      })
    });
  })

router.route('/:orderId')
  .put(function (req, res, next) {
    const orderId = req.params.orderId;
    const userId = req.session.userInfo._id;
    const order = req.body;
    order.userId = userId;
    Order.findByIdAndUpdate({ _id: orderId }, order, function (err, docs) {
      if (err) {
        return res.send({
          success: false,
          err: err
        })
      } else {
        res.send({
          success: true,
          orders: docs
        })
      }
    });
  })
  .delete(function (req, res, next) {
    const orderId = req.params.orderId;
    Order.deleteOne({ _id: orderId }, function (err, docs) {
      if (!err) {
        res.send({
          success: true,
          order: docs
        })
      } else {
        res.send({
          success: false,
          err: err
        })
      }
    })
  });

router.route('/getordernumber')
  .get(function (req, res, next) {
    const userId = req.session.userInfo._id;
    Order.find({ userId: userId }, function (err, docs) {
      if (err) {
        return res.send({
          success: false,
          err: err
        })
      }

      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const numbers = docs.map(function (item) {
        return parseInt(item.orderNumber.substr(-4));
      });
      const maxNumber = numbers.length == 0 ? 0 : Math.max.apply(null, numbers);
      const orderNumber = 'O' + year + ('0' + month).substr(-2) + ('000' + (maxNumber + 1)).substr(-4)
      res.send({
        success: true,
        orderNumber: orderNumber
      })
    })
  });

router.route('/all')
  .get(function (req, res, next) {
    const userId = req.session.userInfo._id;
    Order.find({ userId: userId }, function (err, docs) {
      if (!err) {
        res.send({
          success: true,
          orders: docs
        })
      } else {
        res.send({
          success: false,
          err: err
        })
      }
    })
  })

module.exports = router;
