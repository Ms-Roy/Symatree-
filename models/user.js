/**
 * Created by Pramity_Roy on 2017-02-25.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  userType:  { type: String, required: true},
  firstName: { type: String, required: true},
  lastName:  {  type: String, required: true},
  email:     {  type: String, required: true},
  password:  {  type: String, required: true}

});
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
  const query = {email: email}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
    if(err) throw err;
  newUser.password = hash;
  newUser.save(callback);
});
});
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
  callback(null, isMatch);
});
}
