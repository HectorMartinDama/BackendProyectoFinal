const { check, validationResult } = require('express-validator')
const { validateResult, validateResultLogin } = require('../helpers/validateHelper')
const User= require('../database/models/user')



// validación al crear un nuevo usuario.
const validateCreate= [
    check('username').trim().custom(async (value)=>{
        const existUsername= await User.findOne({username: value})
        if(existUsername){
            return Promise.reject('The username already exists.')
        }
    }),
    check('email').trim().normalizeEmail().isEmail().withMessage('Must be a valid email.')
    .custom(async (value)=>{ // comprueba que el email no este en uso.
        const existEmail= await User.findOne({email: value})
        if(existEmail){
            return Promise.reject('The email address already exists.')
        }
    }),
    check('password').trim().isLength({min: 6, max: 20}).withMessage('Must be between 6 and 20 characters.'),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]


module.exports= { 
    validateCreate
}