const express = require('express');
const router = express.Router();
const Storage = require('../models/storage');

router.route('/')
  .get(function (req, res, next) {
    const { timeRange, supplierId, noteNumber, currentPage } = req.query;
    let query = {};
    const userId = req.session.userInfo._id;
    query.userId = userId;
    if (timeRange) {
      query.createInstance = { '$gte': timeRange[0], '$lte': timeRange[1] };
    }
    if (supplierId) {
      query.supplierId = supplierId;
    }
    if (noteNumber) {
      query.noteNumber = new RegExp(noteNumber);
    }
    const limit = 2;
    const skip = (currentPage - 1) * limit;
    Storage.count(query, function (err, count) {
      if (err) {
        return res.send({
          success: false,
          err: err
        })
      }
      Storage.find(query).skip(skip).limit(limit).exec(function (err, docs) {
        if (err) {
          return res.send({
            success: false,
            err: err
          })
        }
        res.send({
          success: true,
          list: docs,
          total: count
        })
      })
    })
  })
  .post(function (req, res, next) {
    const userId = req.session.userInfo._id;
    const createInstance = new Date();
    let storageSingle = req.body;
    storageSingle.createInstance = createInstance;
    storageSingle.userId = userId;
    Storage.create(storageSingle, function (err, docs) {
      if (!err) {
        res.send({
          success: true,
          storageSingle: docs
        })
      } else {
        res.send({
          success: false,
          err: err
        })
      }
    })
  })

router.route('/:storageId')
  .put(function (req, res, next) {
    const storageId = req.params.storageId;
    const storageSingle = req.body;
    Storage.findByIdAndUpdate({ _id: storageId }, storageSingle, function (err, docs) {
      if (!err) {
        res.send({
          success: true,
          storageSingle: docs
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
    const storageId = req.params.storageId;
    Storage.deleteOne({ _id: storageId }, function (err, docs) {
      if (!err) {
        res.send({
          success: true,
          storageSingle: docs
        })
      } else {
        res.send({
          success: false,
          err: err
        })
      }
    })
  })

router.route('/getnotenumber')
  .get(function (req, res, next) {
    const userId = req.session.userInfo._id;
    Storage.find({ userId: userId }, function (err, docs) {
      if (!err) {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        let numbers = docs.map(function (item) {
          return parseInt(item.noteNumber.substr(-4));
        });
        let maxNumber = numbers.length == 0 ? 0 : Math.max.apply(null, numbers);
        const noteNumber = 'S' + year + ('0' + month).substr(-2) + ('0000' + (maxNumber + 1)).substr(-4);
        res.send({
          success: true,
          noteNumber: noteNumber
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
