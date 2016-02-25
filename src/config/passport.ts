import User from './../app/models/user';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

export default class Passport {

    public static init() {
        var bcrypt = require('bcrypt-nodejs');

        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            User.userModel.find({ where: { id: id } })
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
                User.userModel.find({ where: { email: email } })
                    .then((user) => {
                        if (user) {
                            // if the user is already exist
                            return done(null, false, { message: "The user is already exist" });
                        }

                        var newUser = new User();
                        newUser.email = email;
                        newUser.password = bcrypt.hashSync(password);

                        newUser.save().then((user) => {
                            return done(null, user);
                        }, (err) => {
                            throw err;
                        })
                    }, (err) => {
                        throw err;
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
                User.userModel.find({ where: { email: email } })
                    .then((user) => {
                        if (!user) {
                            // if the user is not exist
                            return done(null, false, { message: "The user is not exist" });
                        }

                        if (!bcrypt.compareSync(password, user.password)) {
                            return done(null, false, { message: "Wrong password" });
                        }

                        return done(null, user);
                    }, (err) => {
                        throw err;
                    });
            }
        ));
    }
}