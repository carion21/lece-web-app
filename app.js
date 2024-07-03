const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const fs = require('fs');

const HomeController = require('./controllers/HomeController');
const TopReadingController = require('./controllers/TopReadingController');
const AuthorController = require('./controllers/AuthorController');
const BookController = require('./controllers/BookController');
const GenreController = require('./controllers/GenreController');

const app = express();

// view engine setup
app.engine('ejs', require('express-ejs-extend'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(
  '/',
  (req, res, next) => {
    console.log("__HomeController________________________________")
    next()
  }, HomeController
)

app.use(
  '/top-reading',
  (req, res, next) => {
    console.log("__TopReadingController____________________________")
    next()
  }, TopReadingController
)

app.use(
  '/author',
  (req, res, next) => {
    console.log("__AuthorController______________________________")
    next()
  }, AuthorController
)

app.use(
  '/book',
  (req, res, next) => {
    console.log("__BookController______________________________")
    next()
  }, BookController
)

app.use(
  '/genre',
  (req, res, next) => {
    console.log("__GenreController______________________________")
    next()
  }, GenreController
)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
  // res.render('security/notfound', {
  //   appName: APP_NAME,
  //   appVersion: APP_VERSION,
  //   appDescription: APP_DESCRIPTION
  // })
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
