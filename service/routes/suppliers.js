const express = require('express');
const router = express.Router();
const Supplier = require('../models/suppliers');

router.route('/')
  .get(function (req, res, next) {
    const query = {};
    const userId = req.session.userInfo['_id'];
    query.userId = userId;
    if (req.query && req.query.searchSupplierName) {
      query.supplierName = new RegExp(req.query.searchSupplierName);
    }
    const limit = 2;
    const skip = (req.query.currentPage - 1) * limit;
    Supplier.count(query, function (err, count) {
      if (!err) {
        Supplier.find(query).skip(skip).limit(limit).exec(function (err, docs) {
          if (!err) {
            res.send({
              success: true,
              suppliers: docs,
              total: count
            })
          } else {
            res.send({
              success: false,
              err: err
            })
          }
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
    const userId = req.session.userInfo['_id'];
    let supplier = req.body;
    supplier.userId = userId;
    Supplier.create(supplier, function (err, docs) {
      if (!err) {
        res.send({
          success: true,
          supplier: docs
        })
      } else {
        res.send({
          success: false,
          err: err
        })
      }
    })
  })

router.route('/:supplierId')
  .put(function (req, res, next) {
    const supplierId = req.params.supplierId;
    const supplier = req.body;
    Supplier.findByIdAndUpdate({ _id: supplierId }, supplier, function (err, docs) {
      if (!err) {
        res.send({
          success: true,
          supplier: docs
        })
      } else {
        res.send({
          success: false,
          err: err
        })
      }
    })
  })
  .delete(function (req, res, next) {
    const supplierId = req.params.supplierId;
    Supplier.deleteOne({ _id: supplierId }, function (err, docs) {
      if (!err) {
        res.send({
          success: true,
          supplier: docs
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
