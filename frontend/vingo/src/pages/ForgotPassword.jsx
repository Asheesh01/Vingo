import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';
const ForgotPassword = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  const handleSendOtp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/sendotp`, { email }, { withCredentials: true })
      console.log(result)
      setStep(2)
      setErr("")
      setLoading(false)
    } catch (error) {
      setErr(error?.response?.data?.message)
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verifyotp`, { email, otp }, { withCredentials: true })
      console.log(result)
      setErr("")
      setStep(3)
      setLoading(false)
    } catch (error) {
      setErr(error?.response?.data?.message)
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    setLoading(true)
    if (newPassword != confirmPassword) {
      return null
    }
    try {
      const result = await axios.post(`${serverUrl}/api/auth/resetpassword`, { email, newPassword }, { withCredentials: true })
      console.log(result)
      setErr("")
      navigate("/signin")
      setLoading(false)
    } catch (error) {
      setErr(error?.response?.data?.message)
      setLoading(false)
    }
  }


  return (
    <div className='flex items-center justify-center w-full min-h-screen p-4 bg-[#fff9f6]'>
      <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
        <div className='flex items-center gap-4 mb-4'>
          <IoIosArrowBack size={30} className='text-[#ff4d2d] cursor-pointer' onClick=
            {() => navigate("/signin")} />
          <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
        </div>
        {step == 1
          &&
          <div className='mb-6'>
            <label htmlFor="Email" className='block text-gray-700 font-medium mb-1'>Email</label>
            <input type="text" className='w-full border rounded-lg px-3 mb-3 py-2 border-gray-200 focus:outline-none border-[1px]'
              placeholder='Enter your Email' onChange={(e) =>
                setEmail(e.target.value)}
              value={email} />
            <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer
         bg-[#ff4d2d] text-white hover:bg-[#e64323]`} onClick={handleSendOtp} disabled={loading}>
              {loading ? <ClipLoader size={20} color='white' /> : "  Send Otp"}
            </button>
            {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
          </div>}
        {step == 2
          &&
          <div className='mb-6'>
            <label htmlFor="Otp" className='block text-gray-700 font-medium mb-1'>OTP</label>
            <input type="text" className='w-full border rounded-lg px-3 mb-3 py-2 border-gray-200 focus:outline-none border-[1px]'
              placeholder='Enter OTP' onChange={(e) =>
                setOtp(e.target.value)}
              value={otp} />
            <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer
         bg-[#ff4d2d] text-white hover:bg-[#e64323]`} onClick={verifyOtp} disabled={loading} >
              {loading ? <ClipLoader size={20} color='white' /> : " Verify Otp"}
            </button>
            {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}
          </div>
        }
        {step == 3
          &&
          <div>
            <div className='mb-6'>
              <label htmlFor="New Password" className='block text-gray-700 font-medium mb-1'>New Password</label>
              <input type="text" className='w-full border rounded-lg px-3 mb-3 py-2 border-gray-200 focus:outline-none border-[1px]'
                placeholder='Enter new password' onChange={(e) =>
                  setNewPassword(e.target.value)}
                value={newPassword} />
            </div>
            <div className='mb-6'>
              <label htmlFor="Confirm Password" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
              <input type="text" className='w-full border rounded-lg px-3 mb-3 py-2 border-gray-200 focus:outline-none border-[1px]'
                placeholder='Enter Confirm password' onChange={(e) =>
                  setConfirmPassword(e.target.value)}
                value={confirmPassword} />
              <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer
         bg-[#ff4d2d] text-white hover:bg-[#e64323]`} onClick={handleResetPassword} disabled={loading}>
                {loading ? <ClipLoader size={20} color='white' /> : "  Reset Password"}
              </button>
              {err && <p className='text-red-500 text-center my-[10px]'>*{err}</p>}

            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default ForgotPassword