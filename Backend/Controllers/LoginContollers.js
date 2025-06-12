const Login =require('../Models/Login')

const LoginUser=async(req,res)=>{
    try{
        const {name,email}=req.body
        if (!name || !email) return alert("Please fill in all fields")

        const exitUser=await Login.findOne({name})
        if(exitUser){
            alert('user Already exit')
        }
        const NewLogin=new Login({
            name,email
        })
        await NewLogin.save()
        res.status(200).json({message:'Login successfull'})
    }catch(error){
        res.status(400).json({error:error.message})
    }
    
}

module.exports=LoginUser
