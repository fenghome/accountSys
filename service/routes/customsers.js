let express = require('express');
let router = express.Router();
let Customer = require('../models/customers');

router.route('/')
  .post(function(req,res,next){
    let customer = req.body;
    console.log(req.session);
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
  });

module.exports = router;
