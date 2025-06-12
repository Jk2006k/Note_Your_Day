import React ,{useState,useEffect}from 'react'
import './Landing.css'
import { Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  const [userName,setUserName]=useState('')
  const [notes,setNotes]=useState([])

  useEffect(()=>{
    const storedName=localStorage.getItem('userName')
    if(storedName){
      setUserName(storedName)
    }
    fetchNote()
  },[])

  const fetchNote=async()=>{
    try{
      const userName=localStorage.getItem('userName')
      if(!userName){
        setNotes([])
        return
      }
      const res=await fetch(`http://localhost:3000/api/getnote?userName=${encodeURIComponent(userName)}`)
      const data=await res.json()
      if(data.success && data.notes){
        setNotes(data.notes)
      }
    }catch(err){
      alert('error fetching the data',err)
    }

  }

  return (
    <div className="container">
      <div className="heading">
        <h1>Note Your Day</h1>
        {userName ? (
        <div>
          <h2 className="welcome">Welcome, {userName}</h2>
            <button className='but' onClick={() => {
            localStorage.removeItem('userName');
            setUserName('');
             }}>Logout</button>
        </div>
        ) : (
          <button className='but' onClick={() => navigate('/login')}>Login</button>
        )}

      </div>
      <div className="note-box" onClick={() => navigate('/note')}>
        <Pencil className="pen" />
      </div>
      <p className="text">Create your note</p>

      <div className="notegrid">
        {notes.map((note) => (
          <div
            key={note._id}
            className="note-card"
            onClick={() => navigate(`/note/${note._id}`)}
          >
            <div className="note-file-icon">🗒️</div>
            <div className="note-title">{note.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

