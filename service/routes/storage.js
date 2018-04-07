const express = require('express');
const router = express.Router();
const Storage = require('../models/storage');

router.route('/')
  .get(function (req, res, next) {
    const userId = req.session.userId;
    Storage.find({ userId: userId }, function (err, docs) {
      if (!err) {
        res.send({
          success: true,
          list: docs
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
    const userId = req.session.userId;
    Storage.count({ userId: userId }, function (err, count) {
      if (!err) {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const noteNumber = 'S' + year + ('0' + month).substr(-2) + ('0000' + (count + 1)).substr(-4);
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
