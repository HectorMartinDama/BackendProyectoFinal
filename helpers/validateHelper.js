const { validationResult } = require('express-validator')

const validateResult= (req, res, next) =>{
    try{
        validationResult(req).throw()
        return next()
    }catch(err){
        // Renderizo los mensajes de error en la pagina de (signup).
        res.status(401).render('../pages/signup/index', {errors: err.array()})
    }
}

const validateResultLogin= (req, res, next) =>{
    try{
        validationResult(req).throw()
        return next()
    }catch(err){
        // Renderizo los mensajes de error en la pagina de (login).
        res.status(401).render('../pages/login/index', {errors: err.array()})
    }
}




module.exports= { 
    validateResult,
    validateResultLogin
}