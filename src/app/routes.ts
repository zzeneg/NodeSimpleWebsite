import * as passport from 'passport';
import * as express from 'express';

export default class Router {

    public static init(): express.Router {
        var router = express.Router();

        router.get('/', (req, res) => {
            var data = {
                body: 'Hello World',
                user: ''
            };

            if (req.user) {
                data.user = req.user;
            }

            res.render('index', data);
        });

        router.post('/signup', passport.authenticate('local-signup', { successRedirect: '/', failureRedirect: '/', failureMessage: true }));

        router.post('/login', passport.authenticate('local-login', { successRedirect: '/', failureRedirect: '/', failureMessage: true }));

        router.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });

        router.get('/auth/twitter', passport.authenticate('twitter'));

        // handle the callback after twitter has authenticated the user
        router.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/' }));

        return router;
    }
}