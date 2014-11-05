/// <reference path="../typings/node/node.d.ts" />

var Models = require('./app/models');
var DB = require('./config/database');
var Passport = require('./config/passport');
var Routes = require('./app/routes');

export class Server {
    constructor() {
        var passport = require('passport');
        var express = require('express');
        var bodyParser = require('body-parser');
        var session = require('cookie-session');
        var cookieParser = require('cookie-parser');

        var app = express();
        app.set('views', __dirname + '/../views');
        app.set('view engine', 'hbs');

        app.use(cookieParser());
        app.use(session({ secret: 'victoriasecret', resave: true, saveUninitialized: true }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        DB.init('test', 'node', 'passw0rd');
        Models.init(DB.instance);
        Routes.init(app, passport);

        Passport.init(passport, Models.userModel);

        app.listen(3000);
    }
}

export var server = new Server();
