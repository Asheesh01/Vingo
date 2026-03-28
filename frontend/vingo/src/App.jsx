import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/signin'
import ForgotPassword from './pages/ForgotPassword'
import getCurrentUser from './hooks/getCurrentUser'
export const serverUrl="http://localhost:8000"
function App() {
  getCurrentUser()
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/forgot-Password' element={<ForgotPassword/>} />

     
    </Routes>
    
  )
}

export default App
