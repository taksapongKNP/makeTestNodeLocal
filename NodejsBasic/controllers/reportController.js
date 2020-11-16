// const User = require('../models/user');
const Iot = require('../models/iot');
const Resource = require('../models/resource');
const hisResource = require('../models/hisResource');
const { check,validationResult } = require('express-validator');
const reportController = {}

/* Login */
reportController.getReportView = function(req, res, next) {
  Iot.getAllIots(function(err,iots){
    if(err) throw err
    Resource.getAllResources(function(err,resources){
      if(err) throw err
          res.render('iot/reportView',{iots:iots,resources:resources});
    });
  });
  };

reportController.getResourceList = function(req, res, next) {
    var selected = req.query.selectedId;
    // console.log(selected);
    Resource.find({iotId:selected},(err,data)=>{
            if (err){return done(err);}
            // console.log(data);
            res.json(data);

          });
 
  };
  reportController.getChart = function(req, res, next) {
    var selected = req.query.rId;
    var sdate = req.query.sdate;
    var ldate = req.query.ldate;
    // console.log(selected);
    if(sdate == "" || ldate ==""){
      hisResource.find({resourceId:selected},(err,data)=>{
        if (err){return done(err);}
        // console.log(data);
        res.json(data);

      });
    }
    else{
    hisResource.find({resourceId:selected,resourceDate : { '$gte': sdate, '$lte': ldate }},(err,data)=>{
            if (err){return done(err);}
            // console.log(data);
            res.json(data);

          });
    // res.json(selected);
    }
  };



module.exports = reportController;