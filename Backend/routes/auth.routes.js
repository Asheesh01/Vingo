 import express from "express"
import { googleAuth, resetPassword, sendOtp, signin, signout, signup, verifiedOtp } from "../controllers/auth.controller.js"
 const authRouter=express.Router()

 authRouter.post("/signup",signup)
 authRouter.post("/signin",signin)
 authRouter.get("/signout",signout)
 authRouter.post("/sendotp",sendOtp)
 authRouter.post("/verifyotp",verifiedOtp)
 authRouter.post("/resetpassword",resetPassword)
 authRouter.post("/google-auth",googleAuth) 


export default authRouter