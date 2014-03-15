var	models = require('../models.js');

var cursor

// Display moments
exports.view = function(req, res) {
	res.render('login', { 'error': 'Please Login'});
};


exports.validate = function(db) {
	return function(req, res) {
		var username = req.params.user;
		var password = req.params.pass;
		
		db.collection('users').find({name: username, password: password}).toArray(function(err, user) {
			if (user[0] == null) {
				// wrong login
				res.send({'msg': "the username or password is incorrect."});				
			} else {
				// correct login
				console.log("Login Successful");
				res.send( {'msg': user[0] });
			}
		});
	}
};

exports.list = function(db) {
  return function(req, res) {
    db.collection('users').find().toArray(function (err, items) {
      res.json(items);
      // res.render('moments', items);
    })
  }
};

