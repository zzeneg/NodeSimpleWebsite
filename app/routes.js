module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/signup', function (req, res) {
        res.render('signup');
    });

    app.post('/signup', function (req, res, next) {
        console.log('post');
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.send({ success: false, message: 'authentication failed' });
            }
            return res.send({ success: true, message: 'authentication succeeded' });
        });
    });

    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.get('/simple', function (req, res) {
        var data = { name: 'Gorilla' };
        res.render('simple', data);
    });

    app.get('/complex', function (req, res) {
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

    app.get('/loop', function (req, res) {
        var basketballPlayers = [
            { name: 'Lebron James', team: 'the Heat' },
            { name: 'Kevin Durant', team: 'the Thunder' },
            { name: 'Kobe Jordan', team: 'the Lakers' }
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

    app.get('/logic', function (req, res) {
        var data = {
            upIsUp: true,
            downIsUp: false,
            skyIsBlue: "yes"
        };

        res.render('logic', data);
    });
};
