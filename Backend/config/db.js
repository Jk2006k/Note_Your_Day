const mongoose=require('mongoose')


const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb+srv://kishoore004:9876@note.s5ljh8m.mongodb.net/')
        console.log('MongoDB connected')
    }catch(error){
        console.log(error)
    }
}

module.exports=connectDB