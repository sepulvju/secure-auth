var User = require('../models/user');
var bcrypt = require('bcryptjs');

exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
