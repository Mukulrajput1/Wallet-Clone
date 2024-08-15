import { NextRequest,NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import farmer from "@/models/farmerModel";
import getDataFromToken from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect()

export async function POST(request){
    try {  
        const reqBody = await request.json();
        const {fullname,villagename,mobile,email} = reqBody;
        const farmers = await farmer.findOne({name: fullname});
        if(farmers){
            return NextResponse.json({error: "Farmer Already Exist"},{status: 400});
        }
        const newUser =new farmer({
            name:fullname,
            villageName: villagename,
            mobile,
            email
        })
    
        const savedUser = await newUser.save();
        const Farmers = await farmer.find({email: email});
        console.log(savedUser);
        return NextResponse.json({message: "User saved Successfully",success:true,savedUser,data:Farmers});
    } catch (error) {
        return NextResponse.json({error: error.message},{status: 500});
    }
}

export async function GET(request) {
    try {
      const id = await getDataFromToken(request)
      const user= await User.findOne({_id:id})
      const email = user.email
      console.log(id)
      const farmers = await farmer.find({email: email});
      console.log(farmers)
      return NextResponse.json({
        message: "Data fetch Successfully",
        data: farmers,
      });

    } catch (error) {
      return NextResponse.json({ error: "Connot fetch" }, { status: 500 });
    }
  }