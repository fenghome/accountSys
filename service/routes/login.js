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
    } else {
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
        }
      });
    }
  })
});

router.post('/', function (req, res, next) {
  const userInfo = req.body;
  User.findByUserName(userInfo['username'], function (err, userList) {
    if (err) {
      return res.send({
        success: false,
        error: err
      });
    }
    if (userList.length === 0) {
      return res.send({
        success: false,
        code: 1
      })
    }
    if (userInfo['password'] === userList[0]['password']) {
      let authToken = utils.getAuthToken(10);
      return res.send({
        success: true,
        userInfo: {
          username: userInfo['username'],
          authToken: authToken
        }
      })
    } else {
      return res.send({
        success: false,
        code: 2
      })
    }
  })
});

module.exports = router;
