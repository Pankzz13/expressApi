const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('home', { message: 'Thanks for visiting Home Page!' });
});

router.get('/about', function(req, res) {
    res.render('about', { message: 'Thanks for visiting About Page!' });
});

router.get('/register', function(req, res) {
    res.render('register', { errorMessage: 'Register Page Error' });
});

router.get('/login', function(req, res) {
    res.render('login', {"errorMessage": "Login Page Error"});
});

module.exports = router;
