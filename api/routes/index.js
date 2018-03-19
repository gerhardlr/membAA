require('dotenv').load();
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var MY_SECRET = process.env.SECRET;
var validateToken = jwt({
  secret: MY_SECRET,
  userProperty: 'payload'
});

var profileController = require('../controllers/profile');
var authenticationController = require('../controllers/authentication');

// profile
router.get('/profile', validateToken, profileController.readProfile);

// authentication
router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

module.exports = router;