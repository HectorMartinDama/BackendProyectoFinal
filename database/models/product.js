const mongoose= require('mongoose')


const productSchema= new mongoose.Schema({
    modelo: {
        type: String,
        require: true
    },
    marca: {
        type: String,
        require: true
    },
    uid: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// export schema
module.exports= mongoose.model('Product', productSchema)