const LocalStrategy = require('passport-local').Strategy;
const Register = require('../modals/Register.js');
const config = require('../config/database');
module.exports = (passport) => {
    //local Stategy
    passport.use(new LocalStrategy({
            passReqToCallback: true
        },
        function (email, password, done) {
            Register.findOne({
                email: email
            }, function (err, user) {
                if (err) throw err;
                if (!user) {
                    return done(null, false, {
                        message: 'no user found with this email'
                    });
                }
                if (!user.verifyPassword(password)) {
                    return done(null, false, {
                        message: 'worng password'
                    });
                }
                return done(null, user);
            })
            console.log('email');
            ;
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