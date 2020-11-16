var express = require('express');
var router = express.Router();

const Blogs = require('../models/user');
const { checkout } = require('../app');

/* GET users listing. */
router.get('/', function(req, res, next) {

    Blogs.getAllBlogs(function(err,blogs){
        if(err) throw err
        res.render('blogs/index',{data:"ข้อมูล",blogs:blogs});
    });

    
});
router.get('/add', function(req, res, next) {
    res.render('blogs/addForm',{data:"เพิ่มข้อมูล"});
});
router.post('/add',function(req, res, next) {

    data = new Blogs ({
        title:req.body.title,
        description:req.body.description
    })
    console.log(data);
    Blogs.createBlogs(data,function(err,callback){
        if(err) console.log(err);
        res.redirect("/blogs");
    })
});

module.exports = router;