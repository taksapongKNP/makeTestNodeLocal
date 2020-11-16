// module.exports = require('./env/'+process.env.NODE_ENV + '.js');
const mongoose = require('mongoose')
const mongo = require('mongodb');
const { options } = require('../app');
// const db = require('./db');
// const dbUrl = 'mongodb://localhost:2701/blogsDB'
mongoose.connect('mongodb://localhost:27017/user', {useNewUrlParser: true, useUnifiedTopology: true});
// // mongoose.connect(dbUrl,{
// //     useNewUrlParser:true
// // })

const db = mongoose.connection
const Schema = mongoose.Schema