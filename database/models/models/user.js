const mongoose= require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        require: true

    },
    passwordHash: {
        type: String,
        uniqued: true,
        require: true
    },
    products : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

// permite que la propiedades se han inicas
userSchema.plugin(uniqueValidator)


userSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
        returnedObject.id= returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
        delete returnedObject.id
    }
})

// export schema
module.exports= mongoose.model('User', userSchema)