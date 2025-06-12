const mongoose =require('mongoose')


const userSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('User',userSchema)