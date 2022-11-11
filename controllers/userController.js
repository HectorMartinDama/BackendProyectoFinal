const User= require('../database/models/user') // model (mongoose Schema)
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
//const emailController = require('../controllers/emailController')



const createUser= (async (req, res) =>{
    const { username, email, password } = req.body
    // encrypt password
    const saltRounds= 10
    const passwordHash= await bcrypt.hash(password, saltRounds)

    const user= new User({
        username: username,
        email: email,
        passwordHash
    })
    const savedUser= await user.save()
    res.status(200).json({createUser: 'OK', message: 'User create'})
    
})

const login= (async (req, res)=>{
    const body= req.body
    // recupero el usuario
    const user= await User.findOne({email: body.email})
    // asigno el usuario al token
    const userForToken= {
        id: user.id,
        name: user.username
    }
    // firmo el token con la clave secreta
    const token= jwt.sign(userForToken, process.env.JWT_SECRET)
    res.send({token, username: user.username})
})


const info= (async (req, res)=>{
   const { userId } = req // recupero el id del token
   const userData= await User.findById(userId)
   res.status(200).json({username: userData.username, email: userData.email})
})


// exports modules
module.exports= {
    createUser,
    login,
    info
}