// var mongoose = require('mongoose'),
// 	Schema = mongoose.Schema,
// 	bcrypt = require('bcrypt'),
// 	SALT_WORK_FACTOR = 10;

// var therenbackUserSchema = new Schema({
// 	"name": String,
// 	"email": String,
// 	"password": String,
// 	"location": String,
// 	"favorites": [{
// 		"locationName": String,
// 		"imgsrc": String,
// 		"heart": String
// 	}],
// 	"mymoments": [{
// 		"locationName": String,
// 		"imgsrc": String,
// 		"heart": String,
// 		"numOfPhotos": Number,
// 		"photos": [{
// 			"imgsrc": String
// 		}]
// 	}]
// })

// therenbackUserSchema.pre('save', function(next) {

// 	var user = this;

// 	// only hash the password if it has been modified (or is new)
// 	if (!user.isModified('password')) return next();

// 	// generate a salt
// 	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
// 		if( err ) return next(err);

// 		// hash the password using our new salt
// 		bcrypt.hash(user.password, salt, function(err, hash) {
// 			if (err) return next(err);

// 			// override the cleartext password with the hashed one
// 			user.passowrd = hash;
// 			next();
// 		});
// 	});
// });

// therenbackUserSchema.methods.comparePassword = function(candidatePassword, cb) {

// 	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
// 		if (err) return cb(err);
// 		cb(null, isMatch);
// 	});
// };

// exports.User = mongoose.model('User', therenbackUserSchema);