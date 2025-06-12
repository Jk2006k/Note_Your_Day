const express =require('express')
const app=express()
const PORT=process.env.PORT || 3000
const router=require('./Routes')
const connectDB=require('./config/db')
require('dotenv').config(); 
const cors = require('cors');

app.use(cors());
app.use(express.json())
app.use('/api',router)

app.get('/',(req,res)=>{
    try{
        console.log('Hello World')
    }catch(error){
        console.log(error)
    }
})

app.listen(PORT,async()=>{
    try{
        await connectDB()
        console.log(`Server is running at port ${PORT}`)
    }catch(error){
        console.log(error)
    }
})
