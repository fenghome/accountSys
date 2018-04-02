let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');
let Products = require('../models/products');

router.route('/')
  .get(function (req, res, next) {
    const userId = req.session.userInfo['_id'];
    let query = { userId: userId };
    const searchProductName = req.query && req.query.searchProductName;
    if (searchProductName) {
      query.productName = new RegExp(searchProductName);
    }
    const currentPage = req.query && req.query.currentPage;
    const limit = 2;
    const skip = (currentPage - 1) * limit;
    Products.count(query, function (err, count) {
      if (err) {
        res.send({
          success: false,
          err: err
        })
      } else {
        Products.find(query).limit(limit).skip(skip).exec(function (err, docs) {
          if (!err) {
            res.send({
              success: true,
              products: docs,
              total: count
            })
          } else {
            res.send({
              success: false,
              err: err
            })
          }
        })
      }
    })
  })
  .post(function (req, res, next) {
    let product = req.body;
    product.userId = req.session.userInfo['_id'];
    Products.create(product, function (err, docs) {
      if (!err) {
        res.send({
          success: true,
          product: docs
        })
      } else {
        res.send({
          success: false, 
          err: err
        })
      }
    })
  })

router.route('/:productId')  
  .put(function(req,res,next){
    const productId = req.params.productId;
    console.log(productId);
    const product = req.body;
    Products.findByIdAndUpdate({_id:productId},product,function(err,docs){
      if(!err){
        res.send({
          success:true,
          product:docs
        })
      }else{
        res.send({
          success:false,
          err:err
        })
      }
    })
  })
module.exports = router;
