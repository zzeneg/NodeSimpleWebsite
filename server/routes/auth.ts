import * as passport from 'passport';
import * as express from 'express';

export default function Auth(): express.Router {

    var router = express.Router();

    router.get('/', (req, res) => {
        if (req.user) {
            res.json(req.user);
        }
        else {
            res.status(401);
        }

    });

    router.post('/signup', passport.authenticate('local-signup'), (req, res) => { res.json(req.user) });

    router.post('/login', passport.authenticate('local-login'), (req, res) => { res.json(req.user); });

    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    router.get('/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    router.get('/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/' }));

    return router;
}
