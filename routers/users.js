const userController= require('../controllers/userController')
// middlewares
const checkLogin = require('../middleware/checkLogin')
const userExtractor = require('../middleware/userExtractor')
const userRouter= require('express').Router() // create router
const { validateCreate, validateLogin } = require('../validators/users')




userRouter
    .post(('/createUser'), validateCreate, userController.createUser)
    .post(('/login'), checkLogin, userController.login)
    .get(('/info'), userExtractor, userController.info)





// export module
module.exports = userRouter