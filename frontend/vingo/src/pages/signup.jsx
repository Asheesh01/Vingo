import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from 'react-spinners'
const Signup = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRoles] = useState("user")
  const navigate = useNavigate()
  const [fullName, setfullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  const handleSignup = async () => {
    setLoading(true)
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`, // ✅ URL ONLY
        {
          fullName,
          email,
          password,
          mobile: mobileNumber,
          role
        }, // ✅ BODY
        {
          withCredentials: true
        } // ✅ OPTIONS
      );

      console.log(result.data)
      setErr("")
      setLoading(false)
    } catch (error) {
      setErr(error?.response?.data?.message)
      setLoading(false)

    }
  }

  const handleGoogleAuth = async () => {
    if (!mobileNumber) {
      return setErr("Mobile Number is Required")
    }
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    try {
      const data = axios.post(`${serverUrl}/api/auth/google-auth`, {
        fullName: result.user.displayName,
        email: result.user.email,
        role,
        mobile: mobileNumber
      }, { withCredentials: true })
      console.log(data)
    }
    catch (error) {
      setErr(error?.response?.data?.message)
    }
  }
  return (
    <div className='min-h-screen w-full flex items-center justify-center  p-4 ' style=
      {{ backgroundColor: bgColor }} >
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border`}
        style={{
          border: `1px solid ${borderColor}`
        }}>
        {/* FullName  */}
        <h1 className={`text-xl font-bold mb-2 `} style={{ color: primaryColor }}>Vingo</h1>
        <p className='text-gray-600 mb-8'>Crate Your Account to get started with the delicious
          food deliveries</p>
        <div className='mb-4'>
          <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>FullName</label>
          <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none
          ' placeholder='Enter your full name' style={{ border: `1px solid ${borderColor}` }} onChange={(e) =>
              setfullName(e.target.value)}
            value={fullName} required />
        </div>

        {/* Email  */}

        <div className='mb-4'>
          <label htmlFor="Email" className='block text-gray-700 font-medium mb-1'>Email</label>
          <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none'
            placeholder='Enter your Email' style={{ border: `1px solid ${borderColor}` }} onChange={(e) =>
              setEmail(e.target.value)}
            value={email} required />
        </div>

        {/* Mobile  */}
        <div className='mb-4'>
          <label htmlFor="Mobile" className='block text-gray-700 font-medium mb-1'>MobileNumber</label>
          <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none'
            placeholder='Enter your Mobile Number' style={{ border: `1px solid ${borderColor}` }} onChange={(e) =>
              setMobileNumber(e.target.value)}
            value={mobileNumber} required />
        </div>

        {/* Password  */}
        <div className='mb-4'>
          <label htmlFor="Password" className='block text-gray-700 font-medium mb-1'>Password</label>
          <div className='relative'>
            <input type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-none'
              placeholder='Enter your Password' style={{ border: `1px solid ${borderColor}` }} onChange={(e) =>
                setPassword(e.target.value)}
              value={password} required />
            <button className='absolute right-3 top-[14px] text-gray-500 cursor-pointer' onClick={() => {
              setShowPassword(prev => !prev)
            }}>{!showPassword ? <FaEye /> : <FaEyeSlash />}</button>
          </div>
        </div>

        {/* Role */}
        <div className='mb-4'>
          <label htmlFor="role" className='block text-gray-700 font-medium mb-1'>Role</label>
          <div className='flex gap-2'>
            {["user", "owner", "deliverBoy"].map((r) => (
              <button className='flex-1 border rounded-lg px-3 py-2 cursor-pointer  text-center font-medium
                 transition-colors'
                onClick={() => setRoles(r)}
                style={
                  role == r ?
                    { backgroundColor: primaryColor, color: "white" } :
                    { border: `1px solid ${primaryColor}`, color: primaryColor }
                }
              >{r}</button>
            ))}
          </div>
        </div>
        <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer
         bg-[#ff4d2d] text-white hover:bg-[#e64323]`} onClick={handleSignup} disabled={loading} >
          {loading ? <ClipLoader size={20} /> : " Signup"}
          </button>
        {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
        <button className='w-full mt-4 flex items-center justify-center gap-2 border
        rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200 cursor-pointer
        ' onClick={handleGoogleAuth}>
          <FcGoogle size={20} />
          <span>Sign Up With Google</span>
        </button>
        <p className='text-center mt-6 cursor-pointer' onClick={() => navigate("/signin")}>Already have an account ? <span className='text-[#ff4d2d]'>Sign-in</span></p>
      </div>



    </div>
  )
}

export default Signup