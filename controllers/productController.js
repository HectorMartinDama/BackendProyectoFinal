const Product= require('../database/models/product')
const User = require('../database/models/user')
const userExtractor= require('../middleware/userExtractor') // middleware

/* 
    Ejemplo de como llega la autorizacion.
    Bearer .sdfsdfsdfsdfdsfsdf
*/
const createProduct= (async (req, res)=>{
    const body= req.body
    const { userId } = req
    const user= await User.findById(userId)
    
    // Creo el producto
    const product= new Product({
        modelo: body.modelo, 
        marca: body.marca,
        uid: body.uid,
        user: userId
    })

    const saveProduct= await product.save()
    // meto el producto en la tabla del usuario.
    user.products= user.products.concat(saveProduct.id)
    await user.save()
    res.status(204).json({status: 'ok', message: 'Product Create'})
})



module.exports= {
    createProduct
}