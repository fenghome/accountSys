var express = require('express');
var router = express.Router();
let User = require('../models/user');
let utils = require('../utils/utils');
router.post('/logup', function (req, res, next) {
  let userInfo = req.body;

  User.findByUserName(userInfo['username'], (err, userList) => {

    if (err) {
      res.send({
        success: false,
        error: err
      });
    }

    if (userList.length > 0) {
      //该用户名已经存在
      res.send({
        success: false,
        code: 3
      });
    }else{
      let user = new User(userInfo);
      user.save(function (err, user) {
        if (err) {
          res.send({
            error: err
          })
        } else {
          let authToken = utils.getAuthToken(10);
          res.send({
            success: true,
            userInfo: {
              username: userInfo['username'],
              authToken: authToken,
            }
          });
          global[Symbol.for('currentUser')] = user;
          if (global[Symbol.for('authObject')]) {
            global[Symbol.for('authObject')][`${authToken}`] = user['_id'];
          } else {
            global[Symbol.for('authObject')] = { [`${authToken}`]: user['_id'] }
          }
        }
      });
    }
  })

});

module.exports = router;
