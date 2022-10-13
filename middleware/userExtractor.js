const jwt= require('jsonwebtoken')
module.exports = (req, res, next) =>{
    const authorization= req.get('authorization')
    let token= ''
    // comprueba si la sintaxis del tokene es correcta.
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token= authorization.substring(7)
    }
    // Descodifico el token para saber si el valido.
    const decodedToken= jwt.verify(token, process.env.JWT_SECRET)
    // Compruebo si tiene el token
    if(!token || !decodedToken.id){
        return res.status(401).json({error: 'token missing or invalid'})
    }
    // Busco al usuario con el id del usuario guardado en el token.
    const {id: userId}= decodedToken
    req.userId= userId
    next() // vete a la siguiente ruta.
}