import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Landing from './LandingPage/Landing'
import Note from './Note/Note'
import Login from './Login/Login';

const App=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landing/>}/>
                <Route path='/note' element={<Note/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/note/:id' element={<Note/>}/>


            </Routes>
        </BrowserRouter>
    )
}

export default App
