const express= require('express')
const app= express()
app.set('view engine', 'ejs')
const cors= require('cors')
const path= require('path')
const mongoose= require('mongoose')
const userRouter= require('../routers/users') // imports routers
const viewRouter= require('../routers/views')


// connect database
mongoose.connect(process.env.MONGO_URI).then(()=>{
	console.log('DataBase connect successfully.')
}).catch((err)=>{
	console.log('error connecting MongoDB: ' + err.message)
})

// use
app.use(express.json()) // middleware
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.static('public')) // Donde cargar los archivos estaticos
app.use(('/api/users'), userRouter) // asing routers
app.use(('/'), viewRouter)





module.exports= app