var Client = require('../models/client');

exports.postClients = function(client, callback) {
  client.save(callback);
};

exports.getClients = function(userId, callback) {
  Client.find({ userId: userId }, callback);
};
