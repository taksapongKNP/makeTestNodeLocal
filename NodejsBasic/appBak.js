
// var express = require('express');
// var path = require('path');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var session = require('express-session');

// var passport = require('passport');
// var flash = require('connect-flash');

// var app = express();
// var port = process.env.PORT || 3035;

// function SERVER() {
//   var self = this;
//   self.handleDatabase();
// }

// SERVER.prototype.handleDatabase = function () {
//   var self = this;
  
//   var mongoose = require('mongoose');
//   var dbConfig = require('./configs/database');

//   mongoose.Promise = Promise;
//   //database connection
//   var promise = mongoose.connect(dbConfig.url, {
//     useMongoClient: true,
//   });

//   promise.then(function (db) {
//     console.log('Mongoose default connection open to ' + dbConfig.url);
//     self.configureExpress();
//   });

// }

// SERVER.prototype.configureExpress = function () {
//   var self = this;

//   // view engine setup
//   app.set('views', path.join(__dirname, 'views'));
//   app.set('view engine', 'ejs');

//   // express setup
//   app.use(logger('dev'));
//   app.use(bodyParser.json());
//   app.use(bodyParser.urlencoded({ extended: false }));
//   app.use(cookieParser());

//   self.configurePassport();
// }

// SERVER.prototype.configurePassport = function () {
//   var self = this;

//   //session setup
//   app.use(session({
//     secret: 'mynameismoohyong',
//     resave: true,
//     saveUninitialized: true
//   }));

//   //passport setup
//   require('./configs/passport')(passport);
//   app.use(passport.initialize());
//   app.use(passport.session());
//   app.use(flash());

//   //routes setup
//   require('./routes/routes.js')(app, passport);

//   self.start();
// }

// SERVER.prototype.start = function () {
//   var server = app.listen(port, function () {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log("SERVER RUNNING IN http://%s:%s", host, port);
//   });
// }

// new SERVER();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const createError = require('http-errors');


// ส่วนของการใช้งาน router module ต่างๆ 
var loginRouter = require('./routes/login');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogsRouter = require('./routes/blogs');
var boardRouter = require('./routes/board');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {delimiter: '?'});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blogs', blogsRouter);
app.use('/board', boardRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

