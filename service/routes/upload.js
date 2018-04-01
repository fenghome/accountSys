var express = require('express');
var fs = require('fs');
var path = require('path');
var multipart = require('connect-multiparty')
var router = express.Router();


router.route('/')
  .post(multipart(),function (req, res, next) {

    //获得文件名
    var filename = req.files.file.originalFilename || path.basename(req.files.file.path);

    //复制文件到指定路径
    var targetPath = './public/uploads/' + filename;

    //复制文件流
    fs.createReadStream(req.files.file.path).pipe(fs.createWriteStream(targetPath));

    //响应ajax请求，告诉它图片传到哪了
    res.send({ code: 200, data: { url: 'http://' + req.headers.host + '/uploads/' + filename } });
  })
  .delete(function (req, res, next) {
    var filePath = path.join(__dirname,`../public/uploads/${req.body.fileName}`);
    fs.unlink(filePath,function(err){
      if(err){
        res.send({
          err:err
        })
      }else{
        res.send({
          success:true
        })
      }
    })
  });



module.exports = router;
