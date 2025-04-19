"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconPencil, IconTrash, IconEye } from "@tabler/icons-react";
import NavbarAfterLogin from "../components/NavbarAfterLogin";
import Link from "next/link";

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
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (username) {
      fetchMyBlogs();
    }
  }, [username]);

  const fetchMyBlogs = async () => {
    try {
      const response = await axios.get(`/api/blog/get/${username}`);
      setBlogs(response.data.blogs);
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching blogs:", err.message);
      } else {
        console.error("Error fetching blogs:", err);
      }
      setError("Failed to fetch blogs");
      setLoading(false);
    }
  };

  const handleDelete = async (blogId: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`/api/blog/delete/${blogId}`);
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error deleting blog:", err.message);
        } else {
          console.error("Error deleting blog:", err);
        }
        alert("Failed to delete blog");
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
          <NavbarAfterLogin />
        </div>
        <div className="flex items-center justify-center flex-col py-5 gap-2">
          <h2 className="text-4xl font-semibold">My Blogs</h2>
          <p className="text-gray-400 underline">
            You haven&apos;t created any blogs yet!
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-[10vh]">
        <NavbarAfterLogin />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-center flex-col py-5 gap-2">
          <h2 className="text-4xl font-semibold text-center">My Blogs</h2>
          <p className="text-gray-400 underline">Catch your blogs here!</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-2/5 h-52 sm:h-auto">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-full sm:w-3/5 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500 underline">
                        {blog.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {blog.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                      {blog.content.replace(/<[^>]*>/g, "")}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4 gap-3 flex-wrap">
                    <Link
                      href={`/blogs/${blog._id}`}
                      className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                    >
                      <IconEye className="w-4 h-4 mr-1" />
                      View
                    </Link>
                    <div className="flex space-x-3">
                      <Link
                        href={`/blogs/edit/${blog._id}`}
                        className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                      >
                        <IconPencil className="w-4 h-4 mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="flex items-center text-red-600 dark:text-red-400 text-sm font-medium hover:underline"
                      >
                        <IconTrash className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
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
