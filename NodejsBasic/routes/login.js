const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const user = require('../models/user');
require('../configs/passport')(passport);


// using Bodyparser for getting form data
router.use(bodyparser.urlencoded({ extended: true }));
// using cookie-parser and session 
router.use(cookieParser('secret'));
router.use(session({
    secret: 'secret',
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true,
}));
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
// using passport for authentications 
router.use(passport.initialize());
router.use(passport.session());
// using flash for flash messages 
router.use(flash());

// MIDDLEWARES
// Global variable
router.use(function (req, res, next) {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});

const checkAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        return next();
    } else {
        res.redirect('/login');
    }
}

// Connecting To Database
// using Mongo Atlas as database



// ALL THE router 


// Authentication Strategy
// ---------------


router.get('/', (req, res) => {
    res.render('auth/login');
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/login/session',
        failureFlash: true
    })(req, res, next);
});



router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

router.get('/session',checkAuthenticated, (req, res) => {
    res.render('index', { 
        title: 'main' ,
        user:req.user 
      });
});
module.exports = router;