const mongoose=require('mongoose')

const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],

    }
})

module.exports=mongoose.model('Login',LoginSchema)
