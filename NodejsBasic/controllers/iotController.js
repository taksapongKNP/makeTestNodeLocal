const Iot = require('../models/iot');
const Resource = require('../models/resource');
const hisResource = require('../models/hisResource');
const { check,validationResult } = require('express-validator');
const iotController = {}

// iotController.getIotVeiw = function(req, res, next) {

//     res.render('iot/iotView');
    
//   }
  iotController.getIotAdd = function(req, res, next) {

    res.render('iot/addProject');
    
  }
  iotController.postIotAdd = function(req, res, next) {
    //check validate data
   const result= validationResult(req);
   var errors = result.errors;
   for (var key in errors) {
         console.log(errors[key].value);
   }
   if (!result.isEmpty()) {
   //response validate data to register.ejs
      res.render('iot/iotView')
     }
     else{
     //create db data
         data = new Iot ({
            iotId:req.body.iotId,
            iotName:req.body.iotName,
            iotDetail:req.body.iotDetail,
            iotSwitch:'ON'
         })
         console.log(data);
         Iot.createIot(data,function(err,callback){
             if(err) console.log(err);
             res.redirect("/iot");
         })
       }
}

iotController.getIotView = function(req, res, next) {
  Iot.getAllIots(function(err,iots){
    if(err) throw err
    res.render('iot/iotView',{iots:iots});
});

}

iotController.getIotDelete= function(req, res, next) {
    // console.log(req.params.id);
    Iot.deleteIot([req.params.id],function(err){
      if(err) throw err
      console.log('delete complete');
      res.redirect("/iot");
    })
  }

  iotController.postIotUpdate = function(req, res, next) {
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
      res.redirect('/iot')
     }
     else{
     
         data = new Iot ({
            _id :req.body.id,
            iotId:req.body.iotId,
            iotName:req.body.iotName,
            iotDetail:req.body.iotDetail,
         })
         // console.log(req.body.id);
         Iot.updateIot(data,function(err){
             if(err) console.log(err);
             res.redirect("/iot");
         })
       }
     }

//Project


iotController.getProjectView = function(req, res, next) {
  console.log(req.params.id);
  Resource.getProjectResource([req.params.id],function(err,data){
    if(err) throw err
    // console.log(data);
    res.render('iot/projectView',{datas:data});
  })
};

module.exports = iotController;