import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import connect from "@/dbConfig/dbConfig";



connect()
export async function POST(request){
    try {
        const reqBody = await request.json()
        const {username,password} = reqBody
        const user = await User.findOne({email:username})
        if(!user){
            return NextResponse.json({error: "User Not Found"},{status: 400})
        }
        const hashPassword = user.password
        const validPassword = await bcryptjs.compare(password,hashPassword)
        if(!validPassword){
            return NextResponse.json({error: "Invalid Password"},{status: 400})
        }
        if(!user.isVerified){
            return NextResponse.json({error: "Your Email is not verified"},{status: 400})
        }
        const tokenData = {
            id:user._id,
            email: user.email,
            mobile: user.mobile
        }
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d" })
        const response = new NextResponse({
            message: "Login Successfull",
            success: true
        })
        response.cookies.set("token",token,{httpOnly:true})
        return response
    } catch (error) {
        return NextResponse.json({error: error.message},{status: 500})
    }

}