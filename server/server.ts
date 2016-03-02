/// <reference path="../typings/main.d.ts" />

import * as passport from 'passport';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as exphbs from 'express-handlebars';

import Database from './config/database';
import Passport from './config/passport';
import Auth from './routes/auth';

module Website {

    export class Server {
        constructor() {

            var session = require('cookie-session');
            var flash = require('flash');

            var app = express();

            app.use(express.static('build/client'));
            app.use('/server', express.static('server'));
            app.use('/client', express.static('client'));
            app.use('/bower_components', express.static('bower_components'));
            app.use('/node_modules', express.static('node_modules'));

            app.use(cookieParser());
            app.use(session({ secret: 'victoriasecret', resave: true, saveUninitialized: true }));
            app.use(passport.initialize());
            app.use(passport.session());
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use('/api/auth', Auth());

            Database.init('test');
            Passport.init();

            app.listen(3000);
        }
    }
}

var server = new Website.Server();

