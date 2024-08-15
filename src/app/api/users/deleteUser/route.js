import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import connect from "@/dbConfig/dbConfig";
import getDataFromToken from "@/helpers/getDataFromToken";
connect()

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { confirmPassword } = reqBody
        console.log(confirmPassword)
        const id = await getDataFromToken(request)
        console.log(id)
        const user = await User.findOne({ _id:id })
        if(!user){
            return NextResponse.json({error: "User Not Found"},{ status: 400 })
        }
        const isValid = bcryptjs.compare(user.password,confirmPassword)
        if (!isValid) {
            return NextResponse.json({error: "Password is Incorrect"},{ status: 400 })
        }
        const deleteUser = await User.deleteOne({_id:id})
        return NextResponse.json({success:true,message:'Account Deleted Successfully'})
    } catch (error) {
        return NextResponse.json({error:"Something Went Wrong!"},{status:500})
    }
}