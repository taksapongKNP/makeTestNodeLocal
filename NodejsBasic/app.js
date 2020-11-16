
var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const createError = require('http-errors');
const cors = require('cors');


// const port = process.env.PORT || 4000;
// ทำการเชื่อม Websocket Server ตาม url ที่กำหนด

// const WebSocket = require('ws');
// var connection = new WebSocket('ws://localhost:4000')
// connection.onopen = function () {
//   // จะทำงานเมื่อเชื่อมต่อสำเร็จ
//   console.log("connect webSocket");
//   connection.send("Hello ABCDEF"); // ส่ง Data ไปที่ Server
// };
// connection.onerror = function (error) {
//   console.error('WebSocket Error ' + error);
// };
// connection.onmessage = function (e) {
//   // log ค่าที่ถูกส่งมาจาก server
//   console.log("message from server: ", e.data);
// };




// ส่วนของการใช้งาน router module ต่างๆ 
var loginRouter = require('./routes/login');
// var regisRouter = require('./routes/register');

var routeRouter = require('./routes/route');

//Socket

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
app.use(cors());
// app.use('/login', loginRouter);
// app.use('/register', regisRouter);

app.use('/', routeRouter);

//Soket



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

// app.listen(3000, () => console.log('the app is running on localhost:3000'))
module.exports = app;
