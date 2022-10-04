const express= require('express')
const app= express()
const cors= require('cors')
const bodyParse= require("body-parser")
const mongoose= require('mongoose')
const userRouter= require('../routers/users') // imports routers




// connect database
mongoose.connect(process.env.MONGO_URI).then(()=>{
	console.log('DataBase connect successfully.')
}).catch((err)=>{
	console.log('error connecting MongoDB: ' + err.message)
})

// use
app.use(bodyParse.json()) // middleware
app.use(cors())
app.use(('/api/users'), userRouter) // asing routers


module.exports= app