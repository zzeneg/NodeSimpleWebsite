/// <reference path="../../typings/node/node.d.ts" />

export function init(passport, userModel) {
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        userModel.find({ where : { id: id }})
            .complete((err, user) => {
                done(err, user);
            });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            console.log('SIGNUP');
            // query the user from the database
            userModel.find( { where: { email: email }} )
                .complete((err, user) => {
                    if (!!err) {
                        return done(err);
                    }
                    if (user) {
                        // if the user is already exist
                        return done(null, false, {message: "The user is already exist"});
                    }
                    else {
                        userModel.create({
                                email: email,
                                password: password
                            })
                            .complete((err, user) => {
                                if (err) {
                                    console.log(err);
                                    throw err;
                                }
                                return done(null, user);
                            });
                    }
            });
        }
    ));
}


