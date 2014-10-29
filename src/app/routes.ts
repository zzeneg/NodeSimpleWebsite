/// <reference path="../../typings/node/node.d.ts" />

module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/signup', (req, res) => {
        res.render('signup');
    });

    app.post('/signup', (req, res, next) => {
        console.log('post');
        passport.authenticate('local-signup', (err, user, info) => {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (! user) {
                return res.send({ success : false, message : 'authentication failed' });
            }

            return res.send({ success : true, message : 'authentication succeeded' });
        })(req, res, next);
    });

    app.get('/login', (req, res) => {
        res.render('login');
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
};
