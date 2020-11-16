const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    id:{
        type:Schema.ObjectId
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    domain:{
        type:String,
        required:true
    }
});

mongoose.model('User',UserSchema);