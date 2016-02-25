import * as passport from 'passport';
import * as express from 'express';

import Database from './config/database';
import Passport from './config/passport';
import Routes from './app/routes';

module Website {

    export class Server {
        constructor() {
            
            var bodyParser = require('body-parser');
            var session = require('cookie-session');
            var cookieParser = require('cookie-parser');
            var exphbs = require('express-handlebars')
            var flash = require('flash');

            var app = express();

            //app.set('views', __dirname + '/../views');
            app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', partialsDir: "views/partials/" }));
            app.set('view engine', 'hbs');
            app.use(express.static(__dirname + '/../bower_components'));

            app.use(cookieParser());
            app.use(session({ secret: 'victoriasecret', resave: true, saveUninitialized: true }));
            app.use(passport.initialize());
            app.use(passport.session());
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(flash());
            app.use('/', Routes.init());

            Database.init('test');
            Passport.init();

            app.listen(3000);
        }
    }
}

new Website.Server();

