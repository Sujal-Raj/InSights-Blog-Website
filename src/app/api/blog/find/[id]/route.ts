// // pages/api/blog/[id].ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import connectToDatabase from "@/dbConfig/dbConfig";
// import Blog from "@/models/blogModel"; // Assuming you have a Blog model
// import mongoose from 'mongoose';

// type BlogData = {
//   _id: string;
//   title: string;
//   content: string;
//   author: string;
//   createdAt: Date;
//   // Add other blog fields as needed
// }

// type ErrorData = {
//   message: string;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<BlogData | ErrorData>
// ) {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     // Connect to database using your existing function
//     await connectToDatabase();
    
//     const { id } = req.query;
    
//     if (!id || typeof id !== 'string') {
//       return res.status(400).json({ message: 'Invalid blog ID' });
//     }
    
//     // Validate the ID format
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid blog ID format' });
//     }
    
//     // Use your Blog model to fetch the blog
//     const blog = await Blog.findById(id);
    
//     if (!blog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }
    
//     // Return the blog data
//     res.status(200).json({
//       ...blog.toObject(),
//       _id: blog._id.toString() // Convert ObjectId to string
//     } as BlogData);
    
//   } catch (error) {
//     console.error('Error fetching blog by ID:', error);
//     res.status(500).json({ message: 'Failed to fetch blog' });
//   }
// }



// import { NextResponse } from "next/server";
// import connectToDatabase from "@/dbConfig/dbConfig"; // A helper function for DB connection
// import Blog from "@/models/blogModel"; // Your Mongoose model

// export async function GET(req: Request, { params }: { params: { blogs: string } }) {
//   try {
//     await connectToDatabase();
//     const blog = await Blog.findById(params.blogs);

//     if (!blog) {
//       return NextResponse.json({ error: "Blog not found" }, { status: 404 });
//     }

//     return NextResponse.json(blog);
//   } catch (error) {
//     console.error("Error fetching blog:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import connectToDatabase from "@/dbConfig/dbConfig"; // Ensure correct path
import Blog from "@/models/blogModel"; // Ensure correct path
import mongoose from "mongoose";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // console.log("Connecting to database...");
    await connectToDatabase();
    // console.log("Database connected.");

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      console.error("Invalid Blog ID format:", params.id);
      return NextResponse.json({ error: "Invalid Blog ID" }, { status: 400 });
    }

    // console.log("Fetching blog with ID:", params.id);
    const blog = await Blog.findById(params.id);

    if (!blog) {
      console.warn("Blog not found:", params.id);
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // console.log("Blog found:", blog);
    return NextResponse.json(blog);
  } catch (error:any) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

