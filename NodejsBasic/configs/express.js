var express = require('express');
const app = require('../app');
const { session } = require('passport');
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());