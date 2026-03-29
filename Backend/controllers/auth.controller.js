import User from "../models/user.model.js"
import { sendOtpMail } from "../Utils/mail.js";
import genToken from "../Utils/token.js"
import bcrypt from "bcrypt";
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "user already exists." });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be 6 character." });
    }

    if (!mobile || mobile.length < 10) {
      return res.status(400).json({ message: "MobileNumber must be 10 character." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      role
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
       path: "/"
    });

    return res.status(201).json({ user });

  } catch (error) {
    console.log(error);
    return res.status(500).json(`sign up error ${error}`);
  }
};
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "user does not exists." })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" })
    }
    const token = await genToken(user._id)
    res.cookie("token", token, {
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
       path: "/"
    })
    return res.status(200).json({ user })
  }
  catch (error) {
    return res.status(500).json(`sign in errpr ${error}`)
  }
}
export const signout = async (req, res) => {
  try {
    res.clearCookie("token")
    return res.status(200).json({ message: "Logout Successfully" })
  }
  catch (error) {
    return res.status(500).json(`sign out error ${error}`)
  }
}

export const sendOtp=async(req,res)=>{
  try {
    const {email}=req.body
    const user=await User.findOne({email})
   if(!user){
      return res.status(400).json({message:"User Does Not Exists"})
    } 
    const otp=Math.floor(1000 + Math.random() * 9000).toString()
    user.resetOtp=otp
    user.otpExpires=Date.now() + 5 * 60 * 1000
    user.isOtpVerified=false
    await user.save()
    await sendOtpMail(email,otp)
    return res.status(200).json({message:"otp sent successfully"})
  } catch (error) {
      console.log("SEND OTP ERROR:", error);  // 👈 MUST ADD
  return res.status(500).json({ message: "Server error" });
  }
}

export const verifiedOtp=async(req,res)=>{
 try {
   const {email,otp}=req.body
   const user=await User.findOne({email})
     if(!user || user.resetOtp!=otp || user.otpExpires<Date.now()){
      return res.status(400).json({message:"invalid/expires Otp"})
    }
    user.isOtpVerified=true
    user.resetOtp=undefined
    user.otpExpires=undefined
    await user.save()
    return res.status(200).json({message:"Otp Verified Successfully"})
 } catch (error) {
   return res.status(500).json(`Verify otp error ${error}`)
 }
}

export const resetPassword=async(req,res)=>{
  try{
      const {email,newPassword}=req.body
      const user= await User.findOne({email})
      if(!user || !user.isOtpVerified){
      return res.status(400).json({message:"Otp Verification Required"})
    } 
    const hashpassword=await bcrypt.hash(newPassword,10)
    user.password=hashpassword
    user.isOtpVerified=false
    await user.save()
    return res.status(200).json({message:"Password Reset  Successfully"})
  }
  catch(error){
 return res.status(500).json(`Reset Password  error ${error}`)
  }
}

export const  googleAuth=async(req,res)=>{
  try {
    const {fullName,email,mobile,role}=req.body
    let user=await User.findOne({email})
    if(!user){
        user=await User.create({
        fullName,email,mobile,role
      })
    }
   
    const token = await genToken(user._id)
    res.cookie("token", token, {
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
       path: "/"
    })
    return res.status(200).json({ user })
  }
   catch (error) {
 console.log("ERROR:", error); 
    return res.status(500).json({ message: error.message });
  }

}