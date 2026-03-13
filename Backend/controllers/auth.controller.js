import User from "../models/user.model.js"
import genToken from "../Utils/token.js"

export const signup=async(req,res)=>{
    try{
        const{fullName,email,password,mobile,role}=req.body
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"user already exists."})
        }
        if(password.length<6){
            res.status(400).json({message:"Password must be 6 charcter."})
        }
        if(mobile.length<10){
            res.status(400).json({message:"MobileNumber  must be 10 charcter."})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        user=await User.create({
            fullName,
            email,
            password:hashedPassword,
            mobile,
            role
        })
        const token=await genToken(user._id)
        res.cookie("token",token,{
                secure:false,
                sameSite:"strict",
                maxAge:7*24*60*60*1000,
                httpOnly:true
        })
        return res.status(201).json({user})
    }
    catch(error){
        return res.status(500).json(`sign up errpr ${error}`)

    }
}

export const signin=async(req,res)=>{
    try{
        const{email,password}=req.body
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"user does not exists."})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"})
        }
        const token=await genToken(user._id)
        res.cookie("token",token,{
                secure:false,
                sameSite:"strict",
                maxAge:7*24*60*60*1000,
                httpOnly:true
        })
        return res.status(200).json({user})
    }
    catch(error){
        return res.status(500).json(`sign in errpr ${error}`)
    }
}
export const signout=async(req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"Logout Successfully"})
    }
    catch(error){
         return res.status(500).json(`sign out errpr ${error}`)
    }
}