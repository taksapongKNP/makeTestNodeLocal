var express = require('express');
var router = express.Router();
const { check,validationResult } = require('express-validator');
const { checkout } = require('../app');
/*Controller*/
const userController = require('../controllers/userController');
const iotController = require('../controllers/iotController');
const projectController = require('../controllers/projectController');
const reportController = require('../controllers/reportController');
const domainController = require('../controllers/domainController');


//Log in 
const bodyparser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const user = require('../models/user');
require('../configs/passport')(passport);


// using Bodyparser for getting form data
router.use(bodyparser.urlencoded({ extended: true }));
// using cookie-parser and session 
router.use(cookieParser('secret'));
router.use(session({
    secret: 'secret',
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true,
}));
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
// using passport for authentications 
router.use(passport.initialize());
router.use(passport.session());
// using flash for flash messages 
router.use(flash());

// MIDDLEWARES
// Global variable
router.use(function (req, res, next) {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});

const checkAuth = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        return next();
    } else {
        res.redirect('/loginFail');
    }
}

// Connecting To Database
// using Mongo Atlas as database



// ALL THE router 


// Authentication Strategy
// ---------------


router.get('/login', (req, res) => {
    res.render('auth/login');
});
router.get('/loginFail', (req, res) => {
  res.render('auth/notLogin');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/',
        failureFlash: true
    })(req, res, next);
});



router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

router.get('/login/session',checkAuth, (req, res) => {
    res.render('index', { 
        title: 'main' ,
        user:req.user 
      });
});

//End Login

//Main

router.get('/',checkAuth, function(req, res, next) {
  res.render('index', { 
    title: 'main' ,
    username :req.user ? req.user.username :'','user': req.user 
  });
});


/* UserController */

// router.get('/login',userController.getLogin);
// router.get('/logout',userController.getLogout);
// router.post('/login',userController.postLogin);
router.get('/register',userController.getRegister);
router.post('/register',
[
    check('userName','กรุณากรอกชื่อผู้ใช้').not().isEmpty(),
    check('fname','กรุณากรอกชื่อ').not().isEmpty(),
    check('lname','กรุณากรอกนามสกุล').not().isEmpty(),
    check('password','กรุณากรอกรหัสผ่าน').not().isEmpty(),

    check('cfpassword').custom(async (cfpassword, {req}) => { 
      const password = req.body.password 
    
      // If password and confirm password not same 
      // don't allow to sign up and throw error 
      if(password !== cfpassword){ 
        throw new Error('ยืนยันรหัสผ่านไม่ถูกต้อง') 
      } })
  ],
  userController.postRegister);


router.get('/user/add',checkAuth,userController.getUserAdd);
router.post('/user/add',checkAuth,[
    check('userName','กรุณากรอกชื่อผู้ใช้').not().isEmpty(),
    check('fname','กรุณากรอกชื่อ').not().isEmpty(),
    check('lname','กรุณากรอกนามสกุล').not().isEmpty(),
    check('password','กรุณากรอกรหัสผ่าน').not().isEmpty(),
   
    check('cfpassword').custom(async (cfpassword, {req}) => { 
      const password = req.body.password 
  
      // If password and confirm password not same 
      // don't allow to sign up and throw error 
      if(password !== cfpassword){ 
        throw new Error('ยืนยันรหัสผ่านไม่ถูกต้อง') 
      } })
  ],userController.postUserAdd);
router.get('/user',checkAuth,userController.getUserView);
router.get('/user/delete/:id',checkAuth,userController.getUserDelete );
router.get('/user/edit/:id',checkAuth,userController.getUserEdit  );
router.post('/user/update',checkAuth,[
    check('userName','กรุณากรอกชื่อผู้ใช้').not().isEmpty(),
    check('fname','กรุณากรอกชื่อ').not().isEmpty(),
    check('lname','กรุณากรอกนามสกุล').not().isEmpty()
  ],userController.postUserUpdate);




/* iotController */
router.get('/iot',checkAuth,iotController.getIotView );
router.post('/iot/add',checkAuth,[
  check('iotId','กรุณากรอกรหัส').not().isEmpty(),
  check('iotName','กรุณากรอกชื่อ').not().isEmpty(),
  check('iotDetail','กรุณากรอกรายละเอียด').not().isEmpty()
],iotController.postIotAdd );
router.get('/iot/delete/:id',checkAuth,iotController.getIotDelete );
router.post('/iot/update',checkAuth,[
  check('iotId','กรุณากรอกรหัส').not().isEmpty(),
  check('iotName','กรุณากรอกชื่อ').not().isEmpty(),
  check('iotDetail','กรุณากรอกรายละเอียด').not().isEmpty()
],iotController.postIotUpdate);




/* projectController */
router.get('/iot/project=:id',checkAuth,iotController.getProjectView );



/* reportController */
router.get('/report',checkAuth,reportController.getReportView );
router.get('/report/getResource',checkAuth,reportController.getResourceList );
router.get('/report/getChart',checkAuth,reportController.getChart );






/* domainController */
router.get('/domain',checkAuth,userController.getDomainAll);
router.post('/domain/add',checkAuth,domainController.postDomainAdd);











module.exports = router;
