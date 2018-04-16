const express = require('express');
const router = express.Router();
const Order = require('../models/orders');

router.route('/')
  .get(function (req, res, next) {
    const userId = req.session.userInfo.userId;
    Order.find({ userId: userId }, function (err, docs) {
      if (err) {
        return res.send({
          success: false,
          err: err
        })
      }
      res.send({
        success: true,
        orders: docs
      })
    })
  })

module.exports = router;
