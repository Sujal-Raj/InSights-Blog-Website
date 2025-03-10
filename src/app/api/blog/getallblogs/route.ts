// app/api/blog/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    // Get query parameters for potential filtering/pagination
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    // const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
    // const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    // const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    if (category && category !== 'all') {
      query = { category };
    }
    
    // Fetch blogs with pagination and sorting
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 }) // Most recent first
    //   .skip(skip)
    //   .limit(limit);
    
    // Get total count for pagination
    const totalBlogs = await Blog.countDocuments(query);
    
    return NextResponse.json({
      blogs,
      pagination: {
        total: totalBlogs,
        // page,
        // limit,
        // pages: Math.ceil(totalBlogs / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}