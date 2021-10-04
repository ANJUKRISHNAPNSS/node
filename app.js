var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeeRouter = require('./routes/employee');
var workRouter=require('./routes/work')
var workHistoryRouter=require('./routes/workhistory')
var empfulldetailsRouter=require('./routes/employeefulldetails')
var empsitesRouter=require('./routes/sites')
var cityRouter=require('./routes/cities')

var app = express();
var cors=require('cors')
var whitelist = ['http://localhost:3000']
var corsOptions = {
        origin: function (origin, callback) {
            // if (whitelist.indexOf(origin) !== -1) {
            //     callback(null, true)
            // } else {
            //     callback("Not allowed", true)
            // }
            callback(null, true)
        }
    }

app.use('*', cors(corsOptions));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employee', employeeRouter);
app.use('/work',workRouter)
app.use('/workhistory',workHistoryRouter)
app.use('/employeefulldetails',empfulldetailsRouter)
app.use('/employeesites',empsitesRouter)
app.use('/cities',cityRouter)


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
