var express = require('express');
var router = express.Router();

var Client = require('../models/client');
var clientController = require('../controllers/client');

router.post('/register', ensureAuthenticated, function(req, res){
  var client = new Client();

  client.name = req.body.name;
  client.id = req.body.id;
  client.secret = req.body.secret;
  client.userId = req.user._id;

  clientController.postClients(client, function(err, user){
    if(err) throw err;
    res.json({ code:200, message: 'New Client added', data: client });
  });

});

router.get('/list',ensureAuthenticated, function(req, res){
  var _id = req.user._id;
  clientController.getClients(_id, function(err, clients){
    res.json({code:200, data:clients});
  });
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.json({ message: 'Please login before trying to access' });
	}
};

module.exports = router;
