/**
 * Created by ericdufresne on 2017-02-03.
 */
/**
 * Created by ericdufresne on 2017-01-31.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumbers: {
        type: [Schema.Types.Mixed]
    },
    programOfStudy: {
        type: String
    },
    school: {
        type: String
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function (err, salt) {
            if (err){
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err){
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else{
        return next();
    }
});
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err){
            return cb(err);
        }
        cb(null, isMatch);
    });
};

exports.User = mongoose.model('User', UserSchema);
