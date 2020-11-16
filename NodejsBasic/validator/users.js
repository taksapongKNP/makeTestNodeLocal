const Joi = require('@hapi/joi')
 
const validation = (schema) =>{
    return ((req, res, next) => {
        // ทำการตรวจสอบความถูกต้องของข้อมูล req.body ที่ส่งมา
        Joi.validate(req.body, schema, function (error, value) {
            // กรณีเกิด error ข้อมูลไม่ผ่านการตรวจสอบ 
            if(error) {
                res.locals.errors = {
                    "message": error.details[0].message
                }
                res.locals.user = req.body
                return res.render(req.renderPage)
            } 
            if(!error) next()
        })  
    })
}
 
// กำหนดชุดรูปแบบ schema
const schema = {
    register : Joi.object().keys({
        username: Joi.string().min(3).max(30).required(),
        password:Joi.string().min(6).max(15).required(),
        confirm_password: Joi.any().valid(Joi.ref('password')).required(),
        email: Joi.string().min(3).max(30).required()
            .error(errors => {return{ message:'ยืนยันรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่'}})
    }),
    login : Joi.object().keys({
        email: Joi.string().min(3).max(30).required(),
        password:Joi.string().min(6).max(15).required()
    })
}
 
module.exports = { validation, schema }