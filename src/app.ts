/// <reference path="../typings/node/node.d.ts" />

var express = require('express');
var passport = require('passport');
var session = require('express-session');
var bodyParser   = require('body-parser');


var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(session({ secret: 'victoriasecret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser());

require('./config/passport')(passport);
require('./app/routes.js')(app, passport);

app.listen(3001);
