// const User = require('../models/user');
const { check,validationResult } = require('express-validator');
const projectController = {}

/* Login */
projectController.getProjectView = function(req, res, next) {
    res.render('iot/projectView');
  };



module.exports = projectController;