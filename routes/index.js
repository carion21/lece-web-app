var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/top-seller', (req, res) => {
  res.render('top-seller');
});

router.get('/book', (req, res) => {
  res.render('book');
});

router.get('/author', (req, res) => {
  res.render('author');
});


module.exports = router;
