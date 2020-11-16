const mongoose = require('mongoose')
const mongo = require('mongodb')
// // const dbUrl = 'mongodb://localhost:2701/blogsDB'
// mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParser: true, useUnifiedTopology: true});
// // mongoose.connect(dbUrl,{
// //     useNewUrlParser:true
// // })

// const db = mongoose.connection
// const Schema = mongoose.Schema

const projectSchema = new Schema({
    id:{
        type:Schema.ObjectId
    },
    // projectId:{
    //     type:String,
    //     required:true
    // },
    projectName:{
        type:String,
        required:true
    },
    projectDetail:{
        type:String
    }
}) 
const Project = module.exports = mongoose.model("project",projectSchema);

module.exports.createBlogs = function(newBlogs,callback){
    newBlogs.save(callback)
}

module.exports.getAllBlogs = function(data){
    Blogs.find(data)
}