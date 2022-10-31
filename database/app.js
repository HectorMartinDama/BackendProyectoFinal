const express= require('express')
const app= express()
app.set('view engine', 'ejs')
const cors= require('cors')
const mongoose= require('mongoose')
const userRouter= require('../routers/users') // imports routers
const productRouter= require('../routers/products')

// connect database
mongoose.connect(process.env.MONGO_URI).then(()=>{
	console.log('DataBase connect successfully.')
}).catch((err)=>{
	console.log('error connecting MongoDB: ' + err.message)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.static('public')) // Donde cargar los archivos estaticos
app.use(('/api/users'), userRouter) // asing routers
app.use(('/api/products'), productRouter)



module.exports= app