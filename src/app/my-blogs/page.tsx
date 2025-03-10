"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconPencil, IconTrash, IconEye } from "@tabler/icons-react";
import Image from "next/image";
import NavbarAfterLogin from "../components/NavbarAfterLogin";

interface Blog {
  _id: string;
  title: string;
  category: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  username: string;
}

function MyBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      const response = await axios.get(`/api/blog/get/${username}`);
      setBlogs(response.data.blogs);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch blogs");
      setLoading(false);
    }
  };

  const handleDelete = async (blogId: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`/api/blog/${blogId}`);
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      } catch (err) {
        setError("Failed to delete blog");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">{error}</div>;
  }

  if (blogs.length === 0) {
    return (
      <>
        <div className="min-h-[10vh]">
          <NavbarAfterLogin/>
        </div>
        <div className="flex items-center justify-center flex-col py-5 gap-2">
          <h2 className="text-4xl font-semibold">My Blogs</h2>
          <p className="text-gray-400 underline">You haven't created any blogs yet!</p>
       </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-[10vh]">
        <NavbarAfterLogin/>
      </div>
      <div className="container mx-auto px-4 py-8">
      {/* <h2 className="text-4xl font-semibold text-center mb-4">My Blogs</h2> */}
      <div className="flex items-center justify-center flex-col py-5 gap-2">
        <h2 className="text-4xl font-semibold">My Blogs</h2>
        <p className="text-gray-400 underline">Catch your blogs here!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                sizes="auto"
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 font-medium underline">
                  {blog.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-2xl text-gray-900 font-semibold mb-2 truncate">
                {blog.title}
              </h3>

              <div className="text-gray-900 mb-4 line-clamp-4 min-h-[14vh]">
                {blog.content.replace(/<[^>]*>/g, "")}
              </div>

              <div className="flex justify-between items-center gap-4">
                <button
                  onClick={() => (window.location.href = `/blog/${blog._id}`)}
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <IconEye className="w-4 h-4 mr-1" />
                  View
                </button>

                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      (window.location.href = `/blog/edit/${blog._id}`)
                    }
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <IconPencil className="w-4 h-4 mr-1" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex items-center text-red-600 hover:text-red-800"
                  >
                    <IconTrash className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default MyBlogs;
