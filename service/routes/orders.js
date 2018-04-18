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

router.route('/getordernumber')
  .get(function(req,res,next){
    const userId = req.session.userInfo.userId;
    Order.find({userId:userId},function(err,docs){
      if(err){
        return res.send({
          success:false,
          err:err
        })
      }

      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const numbers = docs.map(function(item){
        return parseInt(item.orderNumber.substr(-4));
      });
      const maxNumber = numbers.length == 0 ? 0 : Math.max.apply(null,numbers);
      const orderNumber = 'O'+year+('0'+month).substr(-2)+('000'+(maxNumber+1)).substr(-4)
      res.send({
        success:true,
        orderNumber:orderNumber
      })
    })
  })

module.exports = router;
