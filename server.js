//set up
var express = require ('express');
var app = express ();
var mongoose = require ('mongoose');
var morgan = require ('morgan');
var bodyParser = require('body-parser');
var methodOverride = require ('method-override');
var cors = require ('cors');

mongoose.connect('mongodb://localhost/symatree');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.user(cord());

app.use(function(req,res,next){
res.header("Access-Control-Allow-Origin","*");
res.header ('Access-Control-Allow-Methods','DELETE, PUT');
res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
next();
});
//models

var User = mongoose.model('User',{
  fname: String,
  lname: String,
  email: String,
  password: String,
  userType: String
});

//Routes

  ///Get Reviews
app.get('/api/users',function (req,res){

  console.log("fetching users");

  //use mongoose to get all reqviews in the database
  User.find(function(err,users){
    //if there is an error retrieving, send the error. nothing after res.send(err) will execute
     if (err)
     res.send(err)
     res.json(users); //return all reviews in JSON format
   });
 });


 //create review and send back all reviews after creation
app.post('/api/users', function(req,res){
  console.log("creating user");
  //create a review, information comes from request from ionic
Review.create({
fname: req.body.fname,
laname: req.body.lname,
email: req.body.email,
password: req.body.password,
userType: req.body.userType,
  done:false
}, function (err,user){
  if (err)
  res.send(err);
  //get and return all the reviews after you create another
  User.find(function(err,users){
    if (err)
    res.send(err)
    res.json(users);
  });
});
});
// delete a review
app.delete ('api/users/:review_id',function (req,res){
User.remove({
    _id: req.params.user_id
  },function(err, user){
}) ;
});
//listen (start app with node server.js)
app.listen(8080);
console.log("App listening on port 8080");
