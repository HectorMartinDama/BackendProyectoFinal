const userController= require('../controllers/userController')
const userRouter= require('express').Router() // create router
const { validateCreate } = require('../validators/users')




userRouter
    .post(('/createUser'), validateCreate, userController.createUser)
    .post(('/login'), userController.login)





// export module
module.exports = userRouter