const LocalStrategy = require('passport-local').Strategy;
const Register = require('../modals/Register.js');
const config = require('../config/database');
module.exports = (passport) => {
    //local Stategy
    passport.use(new LocalStrategy({
            usernameField: 'email'
        },
        (email, password, done) => {
            Register.findOne({
                    email: email
                })
                .then(user => {
                    if (!user) {
                        return done(null, false, {
                            message: 'email is not registered'
                        })
                    }
                    if (!user.password) {
                        return done(null, false, {
                            message: 'Incorrect password.'
                        });
                    }
                   return done(null, user);
                })
        }
    ));

    // part of authenthications
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};