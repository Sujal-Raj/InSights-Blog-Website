import { NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import mongoose from "mongoose";

interface BlogPost {
    title: string | null;
    content: string | null;
    category: string | null;
    imageUrl: string | null;
}

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
        const body: BlogPost = {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            category: formData.get("category") as string,
            imageUrl: (formData.get("imageUrl") || formData.get("image")) as string,
        };

        // Update blog
        const updatedBlog = await Blog.findByIdAndUpdate(params.id, body, { new: true });

        if (!updatedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(updatedBlog);
    } catch (error: unknown) {
        console.error("Error updating blog:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: "Internal Server Error", details: errorMessage }, { status: 500 });
    }
}