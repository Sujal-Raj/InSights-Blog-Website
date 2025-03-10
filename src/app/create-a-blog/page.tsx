"use client"
import React, { useEffect, useState } from "react";
import QuillEditor from "../components/QuillEditor";
import 'quill/dist/quill.snow.css';
import axios from "axios";
import NavbarAfterLogin from "../components/NavbarAfterLogin";


function CreateBlogPage() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) {
      setUsername(name);
    }
  }, []);

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!title || !content || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username); // Attach username for author reference
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("image", image); // Attach image

    // console.log(formData);

    const clearFormData =()=>{
      setTitle("");
      setCategory("");
      setContent("");
      setImage(null);
    }

    try {
      const response = await axios.post("/api/blog/create", formData, {
        // headers: { "Content-Type": "multipart/form-data" },
        
      });
      // console.log("Response:", response.data);
      alert("Blog posted successfully!");
    } catch (error) {
      console.error("Error submitting blog:", error);
    }finally {
      setLoading(false);
    }

    clearFormData();
  };

  return (
    <>
    <div className="min-h-[10vh]">
      <NavbarAfterLogin />
    </div>
      <div className="flex items-center justify-center flex-col py-5">
        <h2 className="text-4xl font-semibold">Create a Blog</h2>
        <p className="text-gray-400 underline">Start writing your blog now!</p>
      </div>
      <div className="w-1/2 mx-auto ">
        <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block font-medium">
                Blog Title:
              </label>
              <div className="mt-2 mb-2">
                <input
                  id="title"
                  name="blogTitle"
                  type="text"
                  placeholder="Blog Title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="category" className="block font-medium">
                Select Category:
              </label>
              <div className="mt-2 mb-2">
                <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                name="category" id="category" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                    <option value="" defaultValue={"General"}>N/A</option>
                    <option value="Technology">Technology</option>
                    <option value="Sports">Sports</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Business">Business</option>
                    <option value="Science">Science</option>
                    <option value="Travel">Travel</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="img" className="block font-medium">
                Cover Image
              </label>
              <div className="mt-2 mb-2">
                <input
                name="image"
                // type="file"
                accept="image/*"
                required
                onChange={handleFileChange}
                id="img" className="lock w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" type="file"  />
              </div>
            </div>
        <div>
            <p className="mb-1">Blog Content:</p>
            <QuillEditor
            value={content}
            onChange={(value: string) => setContent(value)}
            placeholder="Write your content here..."
            />
        </div>
        <div>
              <button
                type="submit"
                className=" rounded-md bg-indigo-600 px-4 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {!loading? "Publish" :"Publishing..."}
              </button>
            </div>
        </form>
      </div>
    </>
  );
}

export default CreateBlogPage;
