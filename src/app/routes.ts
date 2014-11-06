/// <reference path="../../typings/node/node.d.ts" />

export function init(app, passport) {
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

    app.get('/signup', (req, res) => {
        if (req.user) {
            res.redirect('/');
        }

        res.render('signup');
    });

    app.post('/signup', passport.authenticate('local-signup', { successRedirect: '/', failureRedirect: '/signup' }));

    app.get('/login', (req, res) => {
        if (req.user) {
            res.redirect('/');
        }

        res.render('login');
    });

    app.post('/login', passport.authenticate('local-login', { successRedirect: '/', failureRedirect: '/login' }));

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/simple', (req, res) => {
        var data = {name: 'Gorilla'};
        res.render('simple', data);
    });

    app.get('/complex', (req, res) => {
        var data = {
            name: 'Gorilla',
            address: {
                streetName: 'Broadway',
                streetNumber: '721',
                floor: 4,
                addressType: {
                    typeName: 'residential'
                }
            }
        };
        res.render('complex', data);
    });

    app.get('/loop', (req, res) => {
        var basketballPlayers = [
            {name: 'Lebron James', team: 'the Heat'},
            {name: 'Kevin Durant', team: 'the Thunder'},
            {name: 'Kobe Jordan',  team: 'the Lakers'}
        ];

        var days = [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ];

        var data = {
            basketballPlayers: basketballPlayers,
            days: days
        };

        res.render('loop', data);
    });

    app.get('/logic', (req, res) => {
        var data = {
            upIsUp: true,
            downIsUp: false,
            skyIsBlue: "yes"
        };

        res.render('logic', data);
    });
}


