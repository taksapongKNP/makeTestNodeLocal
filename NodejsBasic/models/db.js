const mongoose = require('mongoose')
const mongo = require('mongodb')
mongoose.createConnection('mongodb://localhost:27017/iotBoard,user', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
const Schema = mongoose.Schema