let express = require('express');
let router = express.Router();
let Customer = require('../models/customers');

router.route('/all')
  .get(function (req, res, next) {
    const userId = req.session.userInfo._id;
    Customer.find({ userId: userId }, function (err, docs) {
      if (err) {
        return res.send({ success: false, error: err });
      } else {
        return res.send({ success: true, customers: docs })
      }
    })
  })

router.route('/')
  .get(function (req, res, next) {
    const userId = req.session.userInfo['_id'];
    const page = req.query && req.query.currentPage || 1;
    const limit = 2;
    const skip = (page - 1) * limit;
    let query = {
      userId: userId
    }
    if (req.query && req.query.searchCustomerName) {
      query.customerName = new RegExp(req.query.searchCustomerName);
    }

    Customer.count(query, function (err, count) {
      if (err) {
        return res.send({ success: false, error: err });
      }
      Customer.find(query)
        .limit(limit)
        .skip(skip)
        .exec(function (err, docs) {
          if (err) {
            return res.send({
              success: false,
              error: err
            })
          } else {
            return res.send({
              success: true,
              customers: docs,
              total: count,
              current: page
            })
          }
        })
    });
  })
  .post(function (req, res, next) {
    let customer = req.body;
    const userId = req.session.userInfo['_id'];
    customer.userId = userId;
    Customer.create(customer, function (err, docs) {
      if (err) {
        return res.send({ success: false, error: err })
      } else {
        return res.send({ success: true, customers: docs })
      }
    })
  });

router.route('/:customerId')
  .put(function (req, res, next) {
    const customerId = req.params.customerId;
    const customer = req.body;
    Customer.findByIdAndUpdate({
      _id: customerId
    }, customer, function (err, docs) {
      if (err) {
        return res.send({ success: false, err: err })
      } else {
        return res.send({ success: true, customer: customer })
      }
    })
  })
  .delete(function (req, res, next) {
    const customerId = req.params.customerId;
    Customer.deleteOne({
      _id: customerId
    }, function (err, docs) {
      if (err) {
        return res.send({ success: false, err: err })
      } else {
        return res.send({ success: true, customer: docs })
      }
    })
  });

module.exports = router;
