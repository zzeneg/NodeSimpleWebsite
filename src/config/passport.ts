/// <reference path="../../typings/node/node.d.ts" />

class Passport {
    
    public static init(passport, userModel) {
        var LocalStrategy = require('passport-local').Strategy;
        var bcrypt = require('bcrypt-nodejs');

        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            userModel.find({ where: { id: id } })
                .then((user) => {
                    done(null, user);
                });
        });

        passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
            (email, password, done) => {
                console.log('SIGNUP');
                // query the user from the database
                userModel.find({ where: { email: email } })
                    .then((user) => {
                        if (user) {
                            // if the user is already exist
                            return done(null, false, { message: "The user is already exist" });
                        }

                        userModel.create({
                            email: email,
                            password: bcrypt.hashSync(password)
                        })
                            .then((user) => {
                                return done(null, user);
                            });

                    });
            }
        ));

        passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
            (email, password, done) => {
                console.log('LOGIN');
                // query the user from the database
                userModel.find({ where: { email: email } })
                    .then((user) => {
                        if (!user) {
                            // if the user is not exist
                            return done(null, false, { message: "The user is not exist" });
                        }

                        if (!bcrypt.compareSync(password, user.password)) {
                            return done(null, false, { message: "Wrong password" });
                        }

                        return done(null, user);
                    });
            }
        ));
    }
}

export = Passport;