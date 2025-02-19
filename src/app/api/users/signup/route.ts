import connectToDatabase from "@/dbConfig/dbConfig";
import user from "@/models/userModel";
import bcryptjs, { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        // console.log(reqBody)
        const{username,email,password} = reqBody;

        const User = await user.findOne({email});

        if(User){
            return NextResponse.json({error:"User already exists"},{status:400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new user({
            username,
            email,
            password:hashedPassword,
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message:"User Created Sucessfully",
            success:true,
            savedUser
        },
        {status:201}
    )

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}
