"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IconPencil, IconTrash, IconEye } from "@tabler/icons-react";
// import Image from "next/image";
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
  // const username = localStorage.getItem("username");
  const [username, setUsername] = useState<string | null>(null);

  // useEffect(() => {
  //   const storedUsername = localStorage.getItem("username");
  //   if (storedUsername) {
  //     setUsername(storedUsername);
  //   }
  // }, [])

  // useEffect(() => {
  //   fetchMyBlogs();
  // }, []);


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
      // console.log(blogs);
    } catch (err:unknown) {
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
      } catch (err:unknown) {
        // setError("Failed to delete blog");
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
      
      <div className="container mx-auto px-4 py-8">
        {/* <h2 className="text-4xl font-semibold text-center mb-4">My Blogs</h2> */}
        <div className="flex items-center justify-center flex-col py-5 gap-2">
          <h2 className="text-4xl font-semibold">My Blogs</h2>
          <p className="text-gray-400 underline ">Catch your blogs here!</p>
        </div>
        {/* 
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
                // sizes="auto"
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
      </div> */}

        <div>
          {blogs.map((blog) => (
            <div key={blog._id} className="px-10 ">
              <div className="flex flex-col md:flex-row gap-5 mb-6 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 !text-white border-b-2">
                <div className="w-[40%]">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    // width={400}
                    // height={00}
                    className="cover h-full w-full"
                  />
                </div>
                <div className="p-6 w-[50%]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 font-medium underline">
                      {blog.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-2xl text-white font-semibold mb-2 truncate">
                    {blog.title}
                  </h3>

                  <div className="text-white mb-4 line-clamp-4 min-h-[14vh]">
                    {blog.content.replace(/<[^>]*>/g, "")}
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    {/* <button
                  onClick={() => (window.location.href = `/blog/${blog._id}`)}
                  className="flex items-center text-indigo-400 hover:text-indigo-800"
                >
                  <IconEye className="w-4 h-4 mr-1" />
                  View
                </button> */}
                    <Link
                      href={`/blogs/${blog._id}`}
                      className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                    >
                      <IconEye className="w-4 h-4 mr-1" />
                      View
                    </Link>

                    <div className="flex space-x-2">
                      {/* <button
                        onClick={() =>
                          (window.location.href = `/blog/edit/${blog._id}`)
                        }
                        className="flex items-center text-blue-400 hover:text-blue-800"
                      >
                        <IconPencil className="w-4 h-4 mr-1" />
                        Edit
                      </button> */}
                      <Link
                        href={`/blogs/edit/${blog._id}`}
                        className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                      >
                        <IconPencil className="w-4 h-4 mr-1" />
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="flex items-center text-red-500 hover:text-red-800"
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
