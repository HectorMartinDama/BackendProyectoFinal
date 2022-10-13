const User= require('../database/models/user') // model (mongoose Schema)
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')



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
    res.status(204).redirect('/') // utilizo 204 porque estoy creando un nuevo recurso en la bdd.
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
    console.log(userForToken)
    const token= jwt.sign(userForToken, process.env.JWT_SECRET)
    // Si se logea con exito lo mando al dashboard.
    //res.status(200).redirect('/dashboard')
    
    res.send({token, username: user.username})
})


// exports modules
module.exports= {
    createUser,
    login
}