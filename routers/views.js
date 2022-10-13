const viewRouter= require('express').Router()

viewRouter.get(('/'), (req, res)=>{
    res.render('../pages/home/index')
})

viewRouter.get(('/login'), (req, res)=>{
    res.render('../pages/login/index')
})

viewRouter.get(('/signup'), (req, res) =>{
    res.render('../pages/signup/index')
})

viewRouter.get(('/dashboard'), (req, res)=>{
    res.render('../pages/dashboard/index')
})

viewRouter.get('*', (req, res)=>{
    res.status(404).render('../pages/404/index')
})





// export module
module.exports = viewRouter