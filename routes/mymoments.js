var models = require('../models');
var ObjectID = require('mongoskin').ObjectID;

// Display moments
exports.view = function(req, res) {
	res.render('login', {'error': 'You are not logged in!'});
};


exports.displayMoments = function(db) {
  return function(req, res) {
    var id = req.params.id;

    db.collection('users').find({ _id : new ObjectID(id) }).toArray(function (err, info) {
      res.render('mymoments', {'userInfo': info});
    })
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


exports.changeGlyph = function(db) {
	return function(req, res) {
    db.collection('users').find().toArray(function (err, items) {
      res.render('mymoments', {'items': items});
      // res.render('moments', items);
    })
  }
}