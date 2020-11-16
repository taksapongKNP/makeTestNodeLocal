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
// const Schema = db.Schema

const iotSchema = new Schema({
    id:{
        type:Schema.ObjectId
    },
    iotId:{
        type:String,
        required:true
    },
    iotName:{
        type:String,
        required:true
    },
    iotDetail:{
        type:String,
        required:true
    },
    iotSwitch:{
        type:String,
        required:true
    }
}) 
const Iot = module.exports = mongoose.model("iot",iotSchema);

module.exports.createIot = function(newIot,callback){
    newIot.save(callback)
}

module.exports.getAllIots = function(data){
    Iot.find(data)
}
// module.exports.getCheckIot =function(data,callback){
//     console.log(data);
//     User.findOne({userName:data.userName,password:data.password},callback)
// }
module.exports.deleteIot = function(id,callback){
    // console.log(User.findOneAndDelete({_id : id},callback));
    Iot.findOneAndDelete({_id : id},callback)
}
// module.exports.getIotEdit = function(id,callback){
//     Iot.findOne({_id : id},callback)
// }
module.exports.updateIot = function(data,callback){
    const update = {
        $set : {
            iotId : data.iotId,
            iotName : data.iotName,
            iotDetail : data.iotDetail,
    }};
    const options = { new: true };
    console.log(data._id);
    Iot.findByIdAndUpdate({_id: data._id},update,options,callback)
}
// createBlogs.save().then(() => console.log('success'));