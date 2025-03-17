import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import mongoose from "mongoose";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      console.error("Invalid Blog ID format:", params.id);
      return NextResponse.json({ error: "Invalid Blog ID" }, { status: 400 });
    }

    const blog = await Blog.findByIdAndDelete(params.id);

    if (!blog) {
      console.warn("Blog not found:", params.id);
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error:any) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }

}