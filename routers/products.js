const productController= require('../controllers/productController')
const productRouter= require('express').Router() // create router
const userExtractor= require('../middleware/userExtractor')


productRouter
    .post(('/createProduct'), userExtractor, productController.createProduct)
    .get(('/allProducts'), userExtractor, productController.allProducts)

    
// export module
module.exports= productRouter