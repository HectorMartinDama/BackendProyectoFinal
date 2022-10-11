const User= require('../database/models/models/user') // model (mongoose Schema)
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')



const createUser= (async (req, res) =>{
    const body= req.body
    // encrypt password
    const saltRounds= 10
    const passwordHash= await bcrypt.hash(body.password, saltRounds)

    const user= new User({
        username: body.username,
        email: body.email,
        passwordHash
    })
    const savedUser= await user.save()
    res.redirect('/')
})

const login= (async(req, res)=>{
    const body= req.body
    // compruebo si el usuario existe en la base de datos.
    const user= await User.findOne({email: body.email})
    const passwordCorrect= user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)
    if(!(user && passwordCorrect)){
        return res.status(401).json({status: 401, message:"Incorrect email or password"})
    }
    // asigno el usuario al token
    const userForToken= {
        email: user.email,
        id: user._id
    }
    // firmo el token con la clave secreta
    const token= jwt.sign(userForToken, process.env.JWT_SECRET)
    res.status(200).send({token, username: user.username})
})


// exports modules
module.exports= {
    createUser,
    login
}