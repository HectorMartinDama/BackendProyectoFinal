const express= require('express')
const app= express()
const cors= require('cors')
const mongoose= require('mongoose')
const userRouter= require('./routers/users') // imports routers


// connect database
mongoose.connect(process.env.MONGO_URI).then(()=>{
	console.log('DataBase connect successfully.')
}).catch((err)=>{
	console.log('error connecting MongoDB: ' + err.message)
})

// use
app.use(express.json())
app.use(cors())
// asing routers
app.use(('/api/users'), userRouter)


module.exports= app