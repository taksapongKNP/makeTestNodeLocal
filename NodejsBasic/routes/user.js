// var express = require('express');
// // var router = express.Router();

// const User = require('../models/user');
// const { checkout } = require('../app');

// /* GET users listing. */
// module.exports = function() {
//     get('/register', function(req, res, next) {
//         res.render('auth/register');
//     });
//     post('/register',function(req, res, next) {

//         data = new User ({
//             firstName:req.body.firstName,
//             lastName:req.body.lastName,
//             password:req.body.password,
//             domain:req.body.domain
//         })
//         console.log(data);
//         User.createUser(data,function(err,callback){
//             if(err) console.log(err);
//             res.redirect("/");
//         })
//     });

// };
    

// router.get('/', function(req, res, next) {

//     Blogs.getAllBlogs(function(err,blogs){
//         if(err) throw err
//         res.render('user/index',{data:"ข้อมูล",blogs:blogs});
//     });

    
// });


// module.exports = router;