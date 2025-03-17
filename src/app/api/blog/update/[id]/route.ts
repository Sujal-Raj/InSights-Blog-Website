import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import mongoose from "mongoose";

export async function PUT(req: Request, { params }: { params: { id: string } }){
    try{
        await connectToDatabase();
        const body = await req.json();
        const updatedBlog = await Blog.findByIdAndUpdate(params.id, body, {new: true});
        if(!updatedBlog){
            console.warn("Blog not found:", params.id);
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json(updatedBlog);

    }
    catch(error:any){
        console.error("Error updating blog:", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}