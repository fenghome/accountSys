let express = require('express');
let router = express.Router();
let Products = require('../models/products');

router.route('/')
    .get(function(req,res,next){
        const userId = req.session.userInfo['_id'];
        let query = { userId:userId };
        Products.find(query,function(err,docs){
            if(err) {
                res.send({
                    success:false,
                    err:err
                })
            }else{
                res.send({
                    success:true,
                    products:docs
                })
            }
        })
    })

module.exports = router;