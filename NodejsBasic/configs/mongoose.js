var config = require('./config');


module.exports = function() {
    mongoose.set('debug',config.debug);
    var db = mongoose.connect(config.mongoUrl);
    return db;
    require('../models/users.model');
}
// var mongoose = require('mongoose');
// const mongo = require('mongodb');
// const { options } = require('../app');
// mongoose.createConnection('mongodb://localhost:27017/iotBoard,users', {useNewUrlParser: true, useUnifiedTopology: true});