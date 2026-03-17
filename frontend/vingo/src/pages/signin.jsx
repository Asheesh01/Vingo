import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App';
const Signin = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false)
  const navigate=useNavigate()
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const handleSignin=async()=>{
    try {
    const result = await axios.post(
      `${serverUrl}/api/auth/signin`, // ✅ URL ONLY
      {
        
        email,
        password,
       
      }, // ✅ BODY
      {
        withCredentials: true
      } // ✅ OPTIONS
    );

      console.log(result.data)
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <div className='min-h-screen w-full flex items-center justify-center  p-4 ' style=
      {{ backgroundColor: bgColor }} >
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border`}
        style={{
          border: `1px solid ${borderColor}`
        }}>
<h1 className={`text-xl font-bold mb-2 `} style={{ color: primaryColor }}>Vingo</h1>
        <p className='text-gray-600 mb-8'>Sign in to Your Account to get started with the delicious
          food deliveries</p>
        {/* Email  */}

        <div className='mb-4'>
          <label htmlFor="Email" className='block text-gray-700 font-medium mb-1'>Email</label>
          <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none'
            placeholder='Enter your Email' style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>
              setEmail(e.target.value)} 
              value={email}   />
        </div>

        {/* Password  */}
        <div className='mb-4'>
          <label htmlFor="Password" className='block text-gray-700 font-medium mb-1'>Password</label>
          <div className='relative'>
            <input type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-none'
              placeholder='Enter your Password' style={{ border: `1px solid ${borderColor}` }} onChange={(e)=>
              setPassword(e.target.value)} 
              value={password}   />
            <button className='absolute right-3 top-[14px] text-gray-500 cursor-pointer' onClick={() => {
              setShowPassword(prev => !prev)
            }}>{!showPassword ? <FaEye /> : <FaEyeSlash />}</button>
            <div className='text-right mb-4 text-[#ff4d2d] font-medium cursor-pointer' onClick={()=>
              navigate("forgot-password")
            }>Forgot Password</div>
          </div>
        </div>
        <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer
         bg-[#ff4d2d] text-white hover:bg-[#e64323]`}onClick={handleSignin}>
           Signin</button>

        <button className='w-full mt-4 flex items-center justify-center gap-2 border
        rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200 cursor-pointer
        '>
          <FcGoogle size={20} />
          <span>Sign In With Google</span>
        </button>
        <p className='text-center mt-6 cursor-pointer' onClick={()=>navigate("/signin")}>Don't  have an account ? <span className='text-[#ff4d2d]'>Sign-up</span></p>
         
      </div>
     

      

    </div>
  )
}

export default Signin