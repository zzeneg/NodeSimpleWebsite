import * as passport from 'passport';
import * as express from 'express';

export default class Router {

    public static init(): express.Router {
        var app = express.Router();

        app.get('/', (req, res) => {
            var data = {
                body: 'Hello World',
                user: ''
            };

            if (req.user) {
                data.user = req.user.dataValues.email;
            }

            res.render('index', data);
        });

        app.post('/signup', passport.authenticate('local-signup', { successRedirect: '/', failureRedirect: '/', failureMessage: true }));

        app.post('/login', passport.authenticate('local-login', { successRedirect: '/', failureRedirect: '/', failureMessage: true }));

        app.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });

        return app;
    }
}