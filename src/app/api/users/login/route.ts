import connectToDatabase from "@/dbConfig/dbConfig";
import user from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";



connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    // console.log(reqBody);
    const {email,password} = reqBody;
    
    const User = await user.findOne({email})

    if(!User){
        return NextResponse.json({error:"User not exist"},{status:400})
    }

    const validPassword = bcryptjs.compare(password,User.password);
    if(!validPassword){
        return NextResponse.json({error:"Invalid Password"},{status:400})
    }

    const tokenData = {
        id: User._id,
        email:User.email,
        username:User.username,
    }

    const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY!,{expiresIn:"1h"})


    const response = NextResponse.json({
        message:"Login Successfull",
        success:true,
        username:tokenData.username,
    })

    response.cookies.set("token",token,{
        httpOnly:true,
    })

    return response;
    
  } catch (error: any) {
    // alert("SignUp Failed");
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
