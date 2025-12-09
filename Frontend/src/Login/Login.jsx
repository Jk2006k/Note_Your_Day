import React ,{useState} from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';


export default function Login(){
    const navigate=useNavigate('')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
 
    const handleSubmit=async()=>{
        try{
            const res=await fetch('https://note-auni.onrender.com/api/login',{
                method:'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body:JSON.stringify({name,email})
            })
            const data =await res.json()
            localStorage.setItem('userName',name)
            navigate('/')
            alert('User logged in successfully',data)
            
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className="container-login">
            <h1>Login</h1>
                <div className="name">
                    <input type="text" placeholder='Enter your Name' className='Name' 
                    value={name}
                    onChange={e=>setName(e.target.value)}/>
                </div>
                <div className="email">
                    <input type="text" placeholder='Enter your Email' className='email' 
                    value={email}
                    onChange={e=>setEmail(e.target.value)}/>
                </div>
                <button className='Login' onClick={handleSubmit}>Login</button>

        </div>
    )
}
