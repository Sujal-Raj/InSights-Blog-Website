"use client";
import React, { useEffect, useState } from "react";
import NavbarAfterLogin from "../components/NavbarAfterLogin";
import Link from "next/link";
// import CreateBlogPage from "../create-a-blog/page";
// import MyBlogsPage from "../my-blogs/page";
import axios from "axios";
import { Heart } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Blog {
  _id: string;
  title: string;
  category: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  username: string;
}

function MainPage() {
  // const [activeSession, setActiveSession] = useState("all-blogs")
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  
  // const [likeCount, setLikeCount] = useState(blogs.likes || 0);
  // const username = localStorage.getItem("username");
  // localStorage.getItem("username");
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // console.log(username);

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      const response = await axios.get(`/api/blog/getallblogs`);
      setBlogs(response.data.blogs);
      setLoading(false);
      // console.log(blogs);
    } catch (err) {
      setError("Failed to fetch blogs");
      setLoading(false);
    }
  };

  const handleLike = () => {
    if (!liked) {
      // setLikeCount(likeCount + 1);
      setLiked(true);
      // Here you would typically make an API call to update likes in your database
      // e.g., axios.post(`/api/posts/${post._id}/like`)
    } else {
      // setLikeCount(likeCount - 1);
      setLiked(false);
      // Similarly, API call to unlike
      // e.g., axios.post(`/api/posts/${post._id}/unlike`)
    }
  };

  const formatDate = (dateString: any) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e:unknown) {
      if (e instanceof Error) {
        console.error("Error formatting date:", e.message);
      } else {
        console.error("Error formatting date:", e);
      }
      return "Recently";
    }
  };

  if(loading == true){
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <>
        <div className="min-h-[10vh] relative z-20">
          <NavbarAfterLogin />
        </div>
        <div className="flex items-center justify-center flex-col py-5 gap-2">
          <h2 className="text-4xl font-semibold">All Blogs</h2>
          <p className="text-gray-400 underline">No Blogs Created yet!</p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="min-h-[10vh] relative z-20">
        <NavbarAfterLogin />
      </div>
      <section className=" min-h-[90vh] p-10  scrollbar-hide relative z-10">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl w-1/2 mx-auto mb-4"
          >
            <div className="relative">
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                  {blog.category}
                </span>
              </div>

              {/* Blog Image */}
              <div className="h-64 overflow-hidden">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Author & Read More */}
            <div className="flex justify-between items-center px-5 py-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-800 dark:text-indigo-200 font-semibold mr-2">
                  {blog.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {blog.username}
                </span>
              </div>
              <Link
                href={`/blogs/${blog._id}`}
                className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
              >
                Read More
              </Link>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {formatDate(blog.createdAt)}
                </p>

                {/* Like Button */}
                <button
                  onClick={handleLike}
                  className="flex items-center gap-1 focus:outline-none"
                >
                  <Heart
                    size={20}
                    className={`transition-colors duration-300 ${
                      liked ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                  />
                  {/* <span className="text-sm text-gray-500 dark:text-gray-400">
                  {likeCount}
                </span> */}
                </button>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {blog.title}
              </h3>

              <h3 className="text-white mb-4 line-clamp-4 min-h-[14vh] dark:text-white">
                {blog.content.replace(/<[^>]*>/g, "")}
              </h3>

              {/* Excerpt */}
              {/* <p className="text-gray-600 dark:text-gray-300 mb-4">
              {getExcerpt(blog.content)}
            </p> */}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default MainPage;
