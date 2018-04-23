var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var upload = require('./routes/upload');
var customers = require('./routes/customsers');
var products = require('./routes/products');
var suppliers = require('./routes/suppliers');
var storage = require('./routes/storage');
var order = require('./routes/orders');
var resource = require('./routes/resource');

mongoose.connect('mongodb://localhost:27017/accountSys');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static('public'));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'accountSys', //设置cookie中保存session id 的字段名称
  secret: 'acc', //通过设置secret来计算hash
  resave: false, //强制更新session
  saveUninitialized: true,
  cookie: {
    maxAge: 800000
  },
  store: new MongoStore({url: 'mongodb://localhost:27017/accountSys'})
}));

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/upload', upload);
app.use('/customers', customers);
app.use('/products', products);
app.use('/suppliers',suppliers);
app.use('/storage',storage);
app.use('/order',order);
app.use('/resource',resource);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req
    .app
    .get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
