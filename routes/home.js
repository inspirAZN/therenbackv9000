var models = require('../models');
var ObjectID = require('mongoskin').ObjectID;

exports.view = function(req, res) {
  res.render('login', {'error': 'You are not logged in!'});
};

exports.dashboard = function(db) {
  return function(req, res) {
    var id = req.params.id;

    console.log(id);
      db.collection('users').find({ _id : new ObjectID(id) }).toArray(function (err, info) {
        res.render('home', {'userInfo': info});
      });
    }
};