
/**
 * Module dependencies.
 */
var handlebars = require('express3-handlebars');
var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');


var routes = require('./routes');
var user = require('./routes/user');
var moments = require('./routes/moments');
var mymoments = require('./routes/mymoments');
var signup = require('./routes/signup');
var login = require('./routes/login');
var home = require('./routes/home');
var camera = require('./routes/camera');

// Database
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/users", {native_parser:true});


var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');


app.use(express.favicon());
app.configure(function(){
	app.use(express.methodOverride());
	app.use(express.bodyParser({keepExtensions:true,uploadDir: __dirname +'/public/uploads'}));
});
app.use(express.cookieParser());
app.use(express.session({ secret: 'Joseph is da besss' }));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
// app.get('/users', user.displayMoments);
// app.get('/moments', moments.view);

// sign up
app.get('/signup', signup.view);				// view page
app.post('/signup/add', signup.signup(db)); 	// add user

// login
app.get('/login', login.view);					// view page
app.post('/login/:user/:pass', login.validate(db));	// validate login

// home
app.get('/home', home.view);					// not logged in
app.get('/home/:id', home.dashboard(db));			// user homepage

// moments
app.get('/moments', moments.view);
app.get('/moments/:id', moments.displayMoments(db));
app.get('/momentslist', moments.list(db));

// moments
app.get('/mymoments', mymoments.view);
app.get('/mymoments/:id', mymoments.displayMoments(db));

// camera
app.get('/camera', camera.view);
app.get('/camera/:id', camera.ready(db));
app.post('/camera/post/:id', camera.postPic(db));
/// Show files
app.get('/uploads/fullsize/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/uploads/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
