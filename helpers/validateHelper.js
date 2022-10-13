const { validationResult } = require('express-validator')

const validateResult= (req, res, next) =>{
    try{
        validationResult(req).throw()
        return next()
    }catch(err){
        res.status(422).json({errors: err.array()})
    }
}

const validateResultLogin= (req, res, next) =>{
    try{
        validationResult(req).throw()
        return next()
    }catch(err){
        // 422 -> No se pudo realizar la peticion por errores de sintaxis.
        res.status(422).json({errors: err.array()})
    }
}


module.exports= { 
    validateResult,
    validateResultLogin
}