"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Get the ID from the URL
import NavbarAfterLogin from "@/app/components/NavbarAfterLogin";
import axios from "axios";

interface Blog {
  _id: string;
  title: string;
  content: string;
  publishedAt: string;
  imageUrl: string;
  createdAt: string;
  username: string;
}

function OneBlog() {
  const { id } = useParams() as { id: string }; // Corrected parameter name
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchMyBlog(id);
    }
  }, [id]); // Added id as dependency

  const fetchMyBlog = async (blogId: string) => {
    try {
      // console.log(blogId);
      const response = await axios.get(`/api/blog/find/${blogId}`);
      // console.log(response.data);
      setBlog(response.data);
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching blog:", error.message);
      setError("Failed to load blog.");
      // setLoading(false);
    }
    
  };

  // if (loading){
  //   return 
  //     (
  //       <div className="flex justify-center items-center min-h-screen">
  //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
  //       </div>
  //     );  
  // }

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <>
      <div className="min-h-[10vh] relative z-20">
        <NavbarAfterLogin />
      </div>
      <section className="min-h-[90vh] max-w-3xl mx-auto mt-6 mb-6  p-6 rounded-lg shadow-lg shadow-slate-300">
        <img src={blog?.imageUrl} alt="" className="rounded-lg mb-4"/>
        <h1 className="text-3xl font-bold">{blog?.title}</h1>
        <p className="text-gray-500 text-md">
          By {blog?.username} on {new Date(blog?.createdAt || "").toDateString()}
        </p>
        <hr className="my-4 border-gray-300" />
        {/* <div className="prose prose-lg dark:prose-invert">{blog?.content}</div> */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
        />
      </section>
    </>
  );
}

export default OneBlog;
