const express= require('express')
const app= express()
app.set('view engine', 'ejs')
const path= require('path')
const mongoose= require('mongoose')
const handleError= require('../middleware/handleErrors')
const userRouter= require('../routers/users') // imports routers
const productRouter= require('../routers/products')
const viewRouter= require('../routers/views')

// connect database
mongoose.connect(process.env.MONGO_URI).then(()=>{
	console.log('DataBase connect successfully.')
}).catch((err)=>{
	console.log('error connecting MongoDB: ' + err.message)
})


app.use(express.static('public')) // Donde cargar los archivos estaticos
app.use(('/api/users'), userRouter) // asing routers
app.use(('/api/products'), productRouter)
app.use(('/'), viewRouter)






module.exports= app