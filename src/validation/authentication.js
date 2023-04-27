const Joi = require('joi');

exports.signUpValidation = async (req,res,next) => {
    const schema = Joi.object({
        userName: Joi.string().trim().required().trim().error(new Error('user name is required!')),
        firstName: Joi.string().trim().required().trim().error(new Error('first name is required!')),
        lastName: Joi.string().trim().required().trim().error(new Error('last name is required!')),
        phone: Joi.string().trim().required().trim().error(new Error('phone is required!')),
        email: Joi.string().trim().lowercase().required().error(new Error('email is required!')),
        password: Joi.string().trim().required().trim().error(new Error('password is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json({message : error.message})
    })
}
exports.signInValidation = async (req,res,next) => {
    const schema = Joi.object({
        email: Joi.string().trim().lowercase().required().error(new Error('email is required!')),
        password: Joi.string().trim().required().trim().error(new Error('password is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json({message : error.message})
    })
}
exports.forgotPasswordValidation = async (req,res,next) => {
    const schema = Joi.object({
        email: Joi.string().trim().lowercase().required().error(new Error('email is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json({message : error.message})
    })
}
exports.verifyOtpValidation = async (req,res,next) => {
    const schema = Joi.object({
        _id: Joi.string().trim().lowercase().required().error(new Error('id is required!')),
        otp: Joi.string().trim().lowercase().required().error(new Error('otp is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json({message : error.message})
    })
}
exports.resetPasswordValidation = async (req,res,next) => {
    const schema = Joi.object({
        id: Joi.string().trim().lowercase().required().error(new Error('id is required!')),
        password: Joi.string().trim().lowercase().required().error(new Error('password is required!')),
    })
    schema.validateAsync(req.body).then(result => {
        req.body = result
        return next()
    }).catch(error => {
        res.status(400).json({message : error.message})
    })
}