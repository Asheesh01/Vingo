import User from "../models/user.model.js"
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
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });

    return res.status(201).json({ user });

  } catch (error) {
    console.log(error);
    return res.status(500).json(`sign up error ${error}`);
  }
};
export const signin=async(req,res)=>{
    try{
        const{email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
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