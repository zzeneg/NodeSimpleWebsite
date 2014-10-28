var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        console.log('SIGNUP');

        User.find({ where: { email: email } }).success(function (user) {
            if (user) {
                return done(null, false, { message: "The user is not exist" });
            } else {
                User.create({
                    username: email,
                    password: password
                }).complete(function (err, user) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    return done(null, user);
                });
            }
        }).error(function (err) {
            return done(err);
        });
    }));
};
