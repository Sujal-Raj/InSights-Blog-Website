import { NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import mongoose from "mongoose";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
        }

        // Check if the request body exists before parsing
        const contentType = req.headers.get("content-type");
        if (!contentType || !contentType.includes("multipart/form-data")) {
            return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
        }

        // Parse FormData request body
        const formData = await req.formData();
        const body: any = {
            title: formData.get("title"),
            content: formData.get("content"),
            category: formData.get("category"),
            imageUrl: formData.get("imageUrl") || formData.get("image") // Handle image upload
        };

        // Update blog
        const updatedBlog = await Blog.findByIdAndUpdate(params.id, body, { new: true });

        if (!updatedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(updatedBlog);
    } catch (error: any) {
        console.error("Error updating blog:", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}