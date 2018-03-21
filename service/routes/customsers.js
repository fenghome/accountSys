let express = require('express');
let router = express.Router();
let Customer = require('../models/customers');

router.route('/')
  .post(function(req,res,next){
    const customer = req.body;
    res.send(customer);
  });

module.exports = router;
