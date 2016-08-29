var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');
var oauth2Controller = require('../controllers/oauth2');

// Create endpoint handlers for oauth2 authorize
router.route('/authorize')
  .get(ensureAuthenticated, oauth2Controller.authorization)
  .post(ensureAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
    req.flash('error_msg', 'Please login before accessing');
    res.redirect('/users/login');
	}
};

module.exports = router;
