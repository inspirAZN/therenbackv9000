var models = require('../models');

// Display moments
exports.view = function(req, res) {
	res.render('signup', { 'title': 'Sign Up!'});
};


exports.signup = function(db) {
  return function(req, res) {
    db.collection('users').insert(req.body, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
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

