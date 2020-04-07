var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var driverRouter = require('./routes/driver');
var tripRouter = require('./routes/trip');
var reportRouter = require('./routes/report');
var requestRouter = require('./routes/request');
var transactionRouter = require('./routes/transaction');
var withdrawalRouter = require('./routes/withdrawal');
var reviewRouter = require('./routes/review');

var swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/driver', driverRouter);
app.use('/trip', tripRouter);
app.use('/report', reportRouter);
app.use('/request', requestRouter);
app.use('/transaction', transactionRouter);
app.use('/withdrawal', withdrawalRouter);
app.use('/review', reviewRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
