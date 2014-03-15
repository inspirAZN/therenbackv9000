var models = require('../models');
var ObjectID = require('mongoskin').ObjectID;
var fs = require('fs');

// Display moments
exports.view = function(req, res) {
	res.render('login', {'error': 'You are not logged in!'});
};


exports.ready = function(db) {
  return function(req, res) {
    var id = req.params.id;

    db.collection('users').find({ _id : new ObjectID(id) }).toArray(function (err, info) {
      res.render('camera', {'userInfo': info});
    })
  }
};


exports.postPic = function(db) {
	return function(req, res) {
    var id = req.params.id;

    var upload = __dirname + "/public/uploads";



    fs.exists(upload, function (exist) {
      if (!exist) {
        fs.mkdir(upload);
      }

      var updateJSON = {
        "mymoments": [{
          "locationName": "Tokyo",
          "imgrsc": req.files.pic.path,
          "heart": "-empty"
        }]
      }



      var user = db.collection('users');
      user.update({ _id : new ObjectID(id) }, updateJSON, function(err, result){
        console.log('user');
      })

      res.send(req.files.pic);

    });
  }
}