let express = require('express');
let router = express.Router();
let Customer = require('../models/customers');

router.route('/all')
  .get(function(req,res,next){
    Customer.find({},function(err,docs){
      if(err){
        return res.send({
          success:false,
          error:err
        });
      }else{
        return res.send({
          success:true,
          customers:docs
        })
      }
    })
  })

router.route('/')
  .post(function(req,res,next){
    let customer = req.body;
    const userId = req.session.userInfo['_id'];
    customer.userId = userId;
    Customer.create(customer,function(err,docs){
      if(err){
        return res.send({
          success:false,
          error:err
        })
      }else{
        return res.send({
          success:true,
          customers:docs
        })
      }
    })
  })

router.route('/:customerId')
  .put(function(req,res,next){
    const customerId = req.params.customerId;
    const customer = req.body;
    console.log('aaaa',customer);
    console.log('id ',customerId);
    Customer.findByIdAndUpdate({_id:customerId},customer,function(err,docs){
      if(err){
        return res.send({
          success:false,
          err:err
        })
      }else{
        return res.send({
          success:true,
          customer:customer
        })
      }
    })
  })

module.exports = router;
