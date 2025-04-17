import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { writeFile } from "fs/promises";
import path from "path";
import Blog from "@/models/blogModel";
import dbConnect from "@/dbConfig/dbConfig";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function POST(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB
    const formData = await req.formData();
    // console.log(formData)
    
    const username = formData.get('username');
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !content || !imageFile) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save Image Locally (Optional)
    const uploadPath = path.join(process.cwd(), "public/uploads", imageFile.name);
    await writeFile(uploadPath, buffer);

    // ✅ Upload Image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(uploadPath, {
      folder: "blog-images",
    });

    // Save Blog to MongoDB
    const newBlog = new Blog({
      username,
      title,
      category,
      content,
      imageUrl: cloudinaryResponse.secure_url,
    });

    await newBlog.save();

    return NextResponse.json({ message: "Blog created successfully", blog: newBlog }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
