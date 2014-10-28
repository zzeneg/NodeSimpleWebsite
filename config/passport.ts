/// <reference path="../typings/node/node.d.ts" />

var LocalStrategy = require('passport-local').Strategy;
var User  = require('../app/models/user');

module.exports = (passport) => {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
        },
        (req, email, password, done)=>{
            console.log('SIGNUP')
            // query the user from the database
        // don't care the way I query from database, you can use
        // any method to query the user from database
        User.find( { where: { email: email }} )
          .success(function(user){
          
            if(user)
              // if the user is not exist
              return done(null, false, {message: "The user is not exist"});
            else {
                User
                  .create({
                    username: email,
                    password: password
                  })
                  .complete(function(err, user) {
                    if (err)
                    {
                        console.log(err);
                        throw err;
                    }
                    return done(null, user);
                  })
            }
            
          })
          .error(function(err){
            // if command executed with error
            return done(err);
          });
        }
        ));
}