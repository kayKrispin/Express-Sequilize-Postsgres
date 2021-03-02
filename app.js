var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var cors = require("cors");

var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

console.log("Database_URL", process.env.DATABASE_URL);


var conString = "postgres://tqwuiusb:zbTpUyKxncCfGNvBkYY-nTmgcKNox1s-@ziggy.db.elephantsql.com:5432/tqwuiusb" //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  console.log(err, "wow")
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    console.log("CONNECTED")
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

