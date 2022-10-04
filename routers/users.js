const bcrypt= require('bcrypt')
// create router
const userRouter= require('express').Router()




userRouter.get(('/'), (req, res)=>{
    res.send('Welcome to api user administrator')
})



// export module
module.exports = userRouter