const express = require('express');
const router = express.Router();
const Supplier = require('../models/suppliers');

router.route('/')
    .get(function(req,res,next){
        const userId = req.session.userInfo['_id'];
        Supplier.find({userId:userId},function(err,docs){
            if(!err){
                res.send({
                    success:true,
                    suppliers:docs 
                })
            }else{
                res.send({
                    success:false,
                    err:err
                })
            }
        })
    })
    .post(function(req,res,next){
        const userId = req.session.userInfo['_id'];
        let supplier = req.body;
        supplier.userId = userId;
        Supplier.create(supplier,function(err,docs){
            if(!err){
                res.send({
                    success:true,
                    supplier:docs   
                })
            }else{
                res.send({
                    success:false,
                    err:err
                })
            }
        })
    })

router.route('/:supplierId')
    .put(function(req,res,next){
        const supplierId = req.params.supplierId;
        const supplier = req.body;
        Supplier.findByIdAndUpdate({_id:supplierId},supplier,function(err,docs){
            if(!err){
                res.send({
                    success:true,
                    supplier:docs
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