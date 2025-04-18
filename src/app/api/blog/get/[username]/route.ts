// app/api/blog/user/[username]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; username: string }> }
) {
  try {

    const { id } = await params;  // Await the promise to access the object

    await dbConnect();


    
    const username = (await params).username;
    const blogs = await Blog.find({ username })
      .sort({ createdAt: -1 }); // Most recent first
    
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}