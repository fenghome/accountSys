let express = require('express');
let router = express.Router();
let Customer = require('../models/customers');

router
  .route('/all')
  .get(function (req, res, next) {
    Customer
      .find({}, function (err, docs) {
        if (err) {
          return res.send({success: false, error: err});
        } else {
          return res.send({success: true, customers: docs})
        }
      })
  })

router
  .route('/')
  .get(function (req, res, next) {
    const userId = req.session.userInfo['_id'];
    const page = req.query && req.query.currentPage || 1;
    console.log('page is : %s',page);
    const limit = 2;
    const skip = (page - 1) * limit;
    let query = {
      userId: userId
    }
    if (req.query && req.query.customerName) {
      query.customerName = new RegExp(req.query.customerName);
    }
    Customer
      .count(query, function (err, count) {
        if (err) {
          return res.send({success: false, error: err});
        } 
        Customer.find(query)
          .limit(limit)
          .skip(skip)
          .exec(function(err,docs){
            if(err){
              return res.send({
                success:false,
                error:err
              })
            }else{
              return res.send({
                success: true,
                customers: docs,
                page:{
                  total:count,
                  current:page
                }
              })
            }
          })  
      });
  })
  .post(function (req, res, next) {
    let customer = req.body;
    console.log('session',req.session.userInfo);
    const userId = req.session.userInfo['_id'];
    customer.userId = userId;
    Customer.create(customer, function (err, docs) {
      if (err) {
        return res.send({success: false, error: err})
      } else {
        return res.send({success: true, customers: docs})
      }
    })
  });

router
  .route('/:customerId')
  .put(function (req, res, next) {
    const customerId = req.params.customerId;
    const customer = req.body;
    Customer.findByIdAndUpdate({
      _id: customerId
    }, customer, function (err, docs) {
      if (err) {
        return res.send({success: false, err: err})
      } else {
        return res.send({success: true, customer: customer})
      }
    })
  })
  .delete(function (req, res, next) {
    const customerId = req.params.customerId;
    Customer.deleteOne({
      _id: customerId
    }, function (err, docs) {
      if (err) {
        return res.send({success: false, err: err})
      } else {
        return res.send({success: true, customer: docs})
      }
    })
  });

module.exports = router;
