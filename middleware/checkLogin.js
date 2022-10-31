const User= require('../database/models/user')
const bcrypt= require('bcrypt')


/* comprueba que el email y la contraseña del usuario son correctos.
    Es decir si es correcto el login deja pasar a la siguiente ruta.
*/
module.exports = async (req, res, next) =>{
    const {email, password} = req.body
    const user= await User.findOne({email: email})
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordCorrect)){
        res.status(401).json({error: 'Invalid user or password'})
    }
    next() // vete a la siguiente ruta.
}