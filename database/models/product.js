const mongoose= require('mongoose')


const productSchema= new mongoose.Schema({
    model: {
        type: String,
        require: true
    },
    brand: {
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