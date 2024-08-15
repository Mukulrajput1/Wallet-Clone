import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";

connect();

export async function GET(request) {
  try {
    const id = await getDataFromToken(request);
    const user = await User.findOne({ _id: id })
    // .select('-password');
    console.log(user.password)
    return NextResponse.json({message: "User found", data: user} )
  } catch (error) {
    return NextResponse.json({ error: "something went wrong" }, { status: 500 });
  }
}
