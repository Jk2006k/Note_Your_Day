const mongoose=require('mongoose')


const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb+srv://kishoore004:9876@ca-database.md27w51.mongodb.net/note')
        console.log('MongoDB connected')
    }catch(error){
        console.log(error)
    }
}

module.exports=connectDB