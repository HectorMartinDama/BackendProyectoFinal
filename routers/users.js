const userController= require('../controllers/userController')
const userRouter= require('express').Router() // create router
const { validateCreate } = require('../validators/users')




userRouter
    .get(('/'), userController.getBienvenida)
    .post(('/'), userController.createUser)
    .post(('/email'), validateCreate, userController.crateEmail)





// export module
module.exports = userRouter