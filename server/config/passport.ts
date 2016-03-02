import User from './../models/user';
import * as passport from 'passport';
import * as config from 'config';
import * as bcrypt from 'bcrypt-nodejs';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as TwitterStrategy } from 'passport-twitter';

export default class Passport {

    public static init() {
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            User.userModel.findById(id)
                .then((user) => {
                    done(null, user);
                });
        });

        passport.use('twitter', new TwitterStrategy({
            consumerKey: config.get<string>('Auth.twitter.consumerKey'),
            consumerSecret: config.get<string>('Auth.twitter.consumerSecret'),
            callbackURL: config.get<string>('Auth.twitter.callbackURL'),
        },
            (token, tokenSecret, profile, done) => {
                User.userModel.findOne({ where: { 'twitterId': profile.id } }).then((user) => {
                    // if the user is found then log them in
                    if (user) {
                        return done(null, user);
                    } else {
                        // if there is no user, create them
                        var newUser = new User();

                        // set all of the user data that we need
                        newUser.twitterId = profile.id;
                        newUser.twitterToken = token;
                        newUser.twitterUserName = profile.username;
                        newUser.twitterDisplayName = profile.displayName;

                        // save our user into the database
                        newUser.save().then((user) => {
                            return done(null, user);
                        }, (err) => {
                            throw err;
                        });
                    }
                }, (err) => {
                    throw err;
                });
            }
        ));

        passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
            (email, password, done) => {
                console.log(email);
                console.log(password);
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
                        });
                    }, (err) => {
                        throw err;
                    });
            }
        ));

        passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
            (email, password, done) => {
                console.log(email);
                console.log(password);
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
