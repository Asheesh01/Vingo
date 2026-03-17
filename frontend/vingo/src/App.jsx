import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/signin'
export const serverUrl="http://localhost:8000"
function App() {
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>} />
            <Route path='/signin' element={<Signin/>} />

     
    </Routes>
    
  )
}

export default App
