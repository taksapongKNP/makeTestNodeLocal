var localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: 'username' }, (username, password, done) => {
        User.findOne({ userName: username }, (err, data) => {
            if (err) throw err;
            if (!data) {
                return done(null, false, { message: "User Doesn't Exists.." });
            }
            bcrypt.compare(password, data.password, (err, match) => {
                if (err) {
                    return done(null, false);
                }
                if (!match) {
                    return done(null, false, { message: "Password Doesn't Match" });
                }
                if (match) {
                    return done(null, data);
                }
            });
        });
    }));

    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        User.findById(id, function (err, user) {
            cb(err, user);
        });
    });
}