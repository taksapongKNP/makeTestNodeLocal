const mongoose = require('mongoose')
const mongo = require('mongodb');
var crypto = require('crypto');
const { options } = require('../app');
var passwordHash = require('password-hash');
// const db = require('./db');
// const dbUrl = 'mongodb://localhost:2701/blogsDB'
mongoose.connect('mongodb://localhost:27017/user', {useNewUrlParser: true, useUnifiedTopology: true});
// // mongoose.connect(dbUrl,{
// //     useNewUrlParser:true
// // })

const db = mongoose.connection
const Schema = mongoose.Schema
// const Schema = db.Schema
// console.log(Schema);
const domainSchema = new Schema({
    id:{
        type:Schema.ObjectId
    },
    domainName:{
        type:String
    },
    domain1:{
        type:String
    },
    domain2:{
        type:String
    },
    domain3:{
        type:String,
    },
    domain4:{
        type:String,
    },
    degree:{
        type:String,
    },
    detail:{
        type:String,
    },
    
    // salt:{
    //     type : String
    // },
    // provider:{
    //     type:String,
    //     // required:'Provider is required'
    // },
    // providerId: String,
    // providerData:{},

}) 
const Domain = module.exports = mongoose.model("domain",domainSchema);


module.exports.createDomain = function(newDomain,callback){
    // console.log('2');
    newDomain.save(callback)
}

// module.exports.getAllUsers = function(data){
//     User.find(data)
// }
// module.exports.getCheckUser =function(data,callback){
//     // console.log(data);
//     User.findOne({userName:data.userName,password:data.password},callback)
// }
// module.exports.deleteUser = function(id,callback){
//     // console.log(User.findOneAndDelete({_id : id},callback));
//     User.findOneAndDelete({_id : id},callback)
// }
// module.exports.getUserEdit = function(id,callback){
//     User.findOne({_id : id},callback)
// }
// module.exports.updateUser = function(data,callback){
    
//     const update = {
//         $set : {
//             firstName : data.firstName,
//             lastName : data.lastName,
//             userName : data.userName,
//             // password :'qwer1234',
//             domain : data.domain
//     }};
//     const options = { new: true };
//     // console.log(data._id);
//     User.findByIdAndUpdate({_id: data._id},update,options,callback)
// }
// createBlogs.save().then(() => console.log('success'));