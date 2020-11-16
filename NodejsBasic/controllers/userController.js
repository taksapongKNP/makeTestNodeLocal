const User = require('../models/user');
const express = require('express');
const routes = express.Router();
const { check,validationResult } = require('express-validator');
const userController = {}
const passwordHash = require('password-hash');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// const { routes, route } = require('../app');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const { urlencoded } = require('body-parser');




// require('../configs/passport')(passport);
// routes.use(cookieParser());
// // using Bodyparser for getting form data
// routes.use(bodyparser.urlencoded({ extended: true }));
// // using cookie-parser and session 

// routes.use(session({
//     secret: 'secret',
//     maxAge: 3600000,
//     resave: true,
//     saveUninitialized: true,
// }));



// // MIDDLEWARES
// // Global variable
// routes.use(function (req, res, next) {
//   res.locals.success_message = req.flash('success_message');
//   res.locals.error_message = req.flash('error_message');
//   res.locals.error = req.flash('error');
//   next();
// });

// const checkAuthenticated = function (req, res, next) {
//   if (req.isAuthenticated()) {
//       res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
//       return next();
//   } else {
//       res.redirect('/login');
//   }
// }


// /*Authentication Strategy */
// // var localStrategy = require('passport-local').Strategy;






// // passport.use(new localStrategy({usernameField:username,passwordField:password},(username,password,done) =>{
// //   User.findOne({userName:username},(err,data)=>{
// //       if (err){return done(err);}
// //       if (!data){
// //           return done(null, false,{
// //               massage : 'Invalid username or password'
// //           });
// //       }
// //   bcrypt.compare(password,data.password,(err,match)=>{
// //     if(err) { return done(null, false);}
// //     if(!match) { return done(null, false);}
// //     if(match) { return done(null, data);}
// //   });
// //   });
// // }));
// // var LocalStrategy = require('passport-local').Strategy;

// // passport.use(new LocalStrategy({
// //   usernameField: 'username',
// //   passwordField: 'password'
// // },
// //   function(username, password, done) {
// //     User.findOne({ userName: username }, function(err, user) {
// //       if (err) { return done(err); }
// //       console.log(user);
// //       if (!user) {
// //         console.log('Incorrect username or password');
// //         return done(null, false, { message: 'Incorrect username or password.' });
// //       }
// //       // if (!user.validPassword(password)) {
// //       //   console.log('Incorrect password.');
// //       //   return done(null, false, { message: 'Incorrect password.' });
// //       // }
// //       bcrypt.compare(password,user.password,(err,match)=>{
// //         if(err) { return done(null, false);}
// //         if(!match) { return done(null, false);}
// //         if(match) { return done(null, data);}
// //       });
// //       return done(null, user);
// //     });
// //   }
// // ));

// // passport.serializeUser(function(user,cb){
// //   cb(null,user.id);
// // });

// // passport.deserializeUser(function(id,cb){
// //   User.findById(id,function(err,user) {
// //     cb(err,user);
// //   });
// // });
// /*End of Authentication Strategy */


// /* Login */
// userController.getLogin = function(req, res, next) {
//     res.render('auth/login');
//   };

// userController.getLogout = function(req, res, next) {
//     res.redirect('/login');
//   };

// userController.postLogin = function(req, res, next) {
//   passport.authenticate('local', {
//     failureRedirect: '/login',
//     successRedirect: '/',
//     failureFlash: true,
// })(req, res, next);
  //   data = new User ({
  //     userName:req.body.username,
  //     password:req.body.password
  //   })
  // console.log(data);
  // User.getCheckUser(data,function(err,user){
  //   if(err) throw err
  //   console.log(user);
  //   if(user == null){
  //     res.redirect('/login');
  //   }
  //   else{
  //     res.redirect('/',);
  //   }
  // });
  // }

/* Register */
userController.getRegister = function(req, res, next) {
    res.render('auth/register', { title: 'สมัครสมาชิก' ,btn:'สมัคร'});
}

userController.postRegister = function(req, res, next) {
  // if(!req.user){
  //   var user = new User(req.body);
  //   user.provider ='local';
  //   user.save(function(err){
  //     if(err){ 
  //       console.log('err 1');
  //       return res.redirect('/register');
  //   }
  //     req.login(user,function(err){
  //       if(err){ 
  //         console.log('err 2');
  //          return next(err);
  //       }
  //       return res.redirect('/');
  //     })
  //   });
  // }else{
  //   return res.redirect('/');
  // }
         //check validate data
        const result= validationResult(req);
        var errors = result.errors;
        for (var key in errors) {
              console.log(errors[key].value);
        }
        if (!result.isEmpty()) {
        //response validate data to register.ejs
           res.render('auth/register', {
            errors: errors,title: 'สมัครสมาชิก' ,btn:'สมัคร'
          })
          }
          else{
          
              bcrypt.genSalt(10,(err,salt) =>{
                if (err) throw err;
                bcrypt.hash(req.body.password,salt,(err,hash)=>{
                  if (err) throw err;
                  password = hash;
                  //create db data
              data = new User ({
                  firstName:req.body.fname,
                  lastName:req.body.lname,
                  userName:req.body.userName,
                  password:password,
                  domain:req.body.domain
              })
              // console.log(data);
              User.createUser(data,function(err,callback){
                  if(err) console.log(err);
                  console.log('Success');
                  res.redirect("/");
              })
                });
              });
            }
    }

/* UserManagment */

userController.getUserAdd = function(req, res, next) {
    res.render('auth/register', { title: 'เพิ่มสมาชิก' ,btn:'บันทึก',add: 'add'});
}

userController.postUserAdd = function(req, res, next) {
    //check validate data
   const result= validationResult(req);
   var errors = result.errors;
   for (var key in errors) {
         console.log(errors[key].value);
   }
   if (!result.isEmpty()) {
   //response validate data to register.ejs
      res.render('auth/register', {
       errors: errors,title: 'เพิ่มสมาชิก' ,btn:'บันทึก',add:'add'
     })
     }
     else{
     //create db data
         data = new User ({
             firstName:req.body.fname,
             lastName:req.body.lname,
             userName:req.body.userName,
             password:passwordHash.generate(req.body.password),
             domain:req.body.domain
         })
         console.log(data);
         User.createUser(data,function(err,callback){
             if(err) console.log(err);
             res.redirect("/user");
         })
       }
}

userController.getUserView = function(req, res, next) {
    User.getAllUsers(function(err,users){
      if(err) throw err
      res.render('auth/userView',{users:users});
  });

}

userController.getUserDelete = function(req, res, next) {
    // console.log(req.params.id);
    User.deleteUser([req.params.id],function(err){
      if(err) throw err
      console.log('delete complete');
      res.redirect("/user");
    })
  }

userController.getUserEdit = function(req, res, next) {
    // console.log(req.params.id);
    User.getUserEdit([req.params.id],function(err,data){
      if(err) throw err
      // console.log(data);
      res.render('auth/editUser',{user:data});
    });
  }
userController.postUserUpdate = function(req, res, next) {
    //check validate data
   const result= validationResult(req);
   var errors = result.errors;
   for (var key in errors) {
         // console.log(errors[key].value);
   }
   if (!result.isEmpty()) {
   //response validate data to register.ejs
     var id = req.body.id;
     console.log('error')
      res.redirect('/user')
     }
     else{
      
     //create db data
    //  console.log('come')
         data = new User ({
             _id :req.body.id,
             firstName:req.body.fname,
             lastName:req.body.lname,
             userName:req.body.userName,
             domain:req.body.domain
         })
         // console.log(req.body.id);
         User.updateUser(data,function(err){
             if(err) console.log(err);
             res.redirect("/user");
         })
       }
     }




//Domain
userController.getDomainAll = function(req, res, next) {
  res.render('auth/domainView');
}

module.exports = userController;