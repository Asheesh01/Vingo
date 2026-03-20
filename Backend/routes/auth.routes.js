 import express from "express"
import { resetPassword, sendOtp, signin, signout, signup, verifiedOtp } from "../controllers/auth.controller.js"
 const authRouter=express.Router()

 authRouter.post("/signup",signup)
 authRouter.post("/signin",signin)
 authRouter.get("/signout",signout)
 authRouter.post("/sendotp",sendOtp)
 authRouter.post("/verifyotp",verifiedOtp)
 authRouter.post("/resetpassword",resetPassword)


export default authRouter