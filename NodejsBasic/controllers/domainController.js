const User = require('../models/user');
const Domain = require('../models/domain');
const express = require('express');
const routes = express.Router();
const { check,validationResult } = require('express-validator');
const domainController = {}
const passwordHash = require('password-hash');
const bcrypt = require('bcryptjs');





/* Domain */


domainController.postDomainAdd = function(req, res, next) {
   
     //create db data
         data = new Domain ({
             domainName:req.body.domainName,
             detail:req.body.detail,
             
         })
         console.log(data);
         Domain.createDomain(data,function(err,callback){
             if(err) console.log(err);
             res.redirect("/domain");
         })
       
}


module.exports = domainController;