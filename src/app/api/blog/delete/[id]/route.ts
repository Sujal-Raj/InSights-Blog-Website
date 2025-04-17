import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import mongoose from "mongoose";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectToDatabase();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid Blog ID format:", id);
      return NextResponse.json({ error: "Invalid Blog ID" }, { status: 400 });
    }

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      console.warn("Blog not found:", id);
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error: unknown) {
    console.error("Error deleting blog:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}
