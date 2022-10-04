const User= require('../database/models/models/user') // model (mongoose Schema)
const bcrypt= require('bcrypt')




const getBienvenida= (req, res)=>{
    res.send('Welcome to api user administrator.')
}


const crateEmail= ((req, res)=>{
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    res.send({message: 'email valido'})
})

const createUser= (async (req, res) =>{
    try{
        const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

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
        res.json(savedUser)

    }catch(err){
        res.status(400).send(err)
    }
})
    




// exports modules
module.exports= {
    createUser,
    getBienvenida,
    crateEmail
}