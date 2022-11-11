const Product= require('../database/models/product')
const User = require('../database/models/user')

/* 
    Ejemplo de como llega la autorizacion.
    Bearer sdfsdfsdfsdfdsfsdf
*/
const createProduct= (async (req, res)=>{
    const { model, brand, uid } = req.body
    const { userId } = req
    const user= await User.findById(userId)
    
    // Creo el producto
    const product= new Product({
        model: model, 
        brand: brand,
        uid: uid,
        user: userId
    })

    const saveProduct= await product.save() // guardamelo en la tabla Products
    // meto el producto en la tabla del usuario.
    user.products= user.products.concat(saveProduct._id)
    await user.save()
    res.status(200).json({status: 'OK', message: 'Product create'})
})


const allProducts= (async (req, res)=>{
    const { userId } = req // recupero el id del usuario guardado en el token.
    const products= await Product.find({user: userId}, { model: 1, brand: 1, uid: 1 , _id: 0})
    res.status(200).json(products)  
})

module.exports={
    createProduct,
    allProducts
}



