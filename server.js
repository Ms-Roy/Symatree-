//server.js

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('./api/db/schema/user.js').User;
var jwt = require('jwt-simple');
var http = require('http');

var authRoutes = require('./api/routes/auth-routes');
var connectionRoutes = require('./api/routes/connection-routes');
var userRoutes = require('./api/routes/user-routes');
var adminRoutes = require('./api/routes/admin-routes');

app.use(bodyParser.json());
app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use(express.static("www")); // Our Ionic app build is in the www folder (kept up-to-date by the Ionic CLI using 'ionic serve')
app.use(passport.initialize());

app.use('/', authRoutes);
app.use('/', connectionRoutes);

app.use('/', userRoutes);

app.use('/', adminRoutes);

app.settings.env = app.settings.env || 'production';

var config = require('./api/config').config;

var secret = config[app.settings.env].jwtSecret;
var MONGODB_URI = config[app.settings.env].mongodbURI;
var port = process.env.PORT || config[app.settings.env].port;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = secret;
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.find({id: jwt_payload.id}, function (err, user) {
        if (err){
            return done(err, false);
        }
        if (user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    });
}));

if (app.settings.env == 'development'){
    mongoose.set('debug', true);
}
mongoose.connect(MONGODB_URI, function (err, res) {
    if (err){
        console.log('Cannot connect to database: '+MONGODB_URI);
        process.exit(0);
    }
    else if (app.settings.env != 'test'){
        console.log('Connected to database: '+MONGODB_URI);
    }
});

var server = http.createServer(app);
server.listen(port, function () {
    if (app.settings.env != 'test'){
        console.log('Server listening on port 8080');
    }
});


module.exports = app;
