const mongoose = require('mongoose')
const mongo = require('mongodb');

mongoose.connect('mongodb://localhost:27017/user', {useNewUrlParser: true, useUnifiedTopology: true});
// // mongoose.connect(dbUrl,{
// //     useNewUrlParser:true
// // })

const db = mongoose.connection
const Schema = mongoose.Schema
// const Schema = db.Schema
// console.log(Schema);
const historyResourceSchema = new Schema({
    id:{
        type:Schema.ObjectId
    },
    resourceId:{
        type:String
    },
    resourceDate:{
        type:Date
    },
    resourceName:{
        type:String
    },
    resourceData:{
        type:String
    },
    iotId:{
        type:String,
        required :true
        
    },
    hisId:{
        type:String,
        required :true
        
    }
    
}) 
const historyResource = module.exports = mongoose.model("historyresource",historyResourceSchema);

// module.exports.createHis = function(newUser,callback){
//     data = new historyResource ({
//         resourceId:"rs-1",
//         resourceDate:"13-08-2560 13:00",
//         resourceName:"humidity",
//         resourceData:"20",
//         iotId:"1111",
//         hisId:"1"
//     })
//     data.save(callback)

// }