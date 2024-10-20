var createError = require('http-errors');
var express = require('express');
var path = require('path');
var flash = require('express-flash');
var session = require('express-session');
var mysql = require('mysql');
var connection = require('./lib/db');
var tasksRouter = require('./routes/tasks'); // Updated router
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views')); // Corrected directory
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
 cookie: { maxAge: 60000 },
 store: new session.MemoryStore,
 saveUninitialized: true,
 resave: 'true',
 secret: 'secret'
}))
app.use(flash());
app.use('/tasks', tasksRouter); // Updated route path for tasks
// catch 404 and forward to error handler
app.use(function(req, res, next) {
 next(createError(404));
});
app.listen(3000);