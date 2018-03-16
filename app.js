var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');

//var index = require('./routes/index');
//var users = require('./routes/users');

// [SH] Bring in the data model
require('./api/models/db');
// [SH] Bring in the Passport config after model is defined
require('./api/config/passport');

// [SH] Bring in the routes for the API (delete the default routes)
var routesApi = require('./api/routes/index');

var server = express();

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(cors());

server.use(passport.initialize());


server.use('/api', routesApi);


//error handlers
// [SH] Catch unauthorised errors
server.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (server.get('env') === 'development') {
    server.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = server;
