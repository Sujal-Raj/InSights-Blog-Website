"use client";
import React, { useEffect, useState } from "react";
import QuillEditor from "../components/QuillEditor";
import "quill/dist/quill.snow.css";
import axios from "axios";
import NavbarAfterLogin from "../components/NavbarAfterLogin";

function CreateBlogPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editorKey, setEditorKey] = useState(0);
  const [generatingSummary, setGeneratingSummary] = useState<boolean>(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

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
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("username", username || "");
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("image", image);

    try {
      await axios.post("/api/blog/create", formData);
      alert("Blog posted successfully!");
      setTitle("");
      setCategory("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Error submitting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSummary = async () => {
    try {
      setGeneratingSummary(true);
      const response = await axios.post("/api/blog/getsummary", { title });
      if (response.data.summary) {
        setContent(response.data.summary);
        setEditorKey((prevKey) => prevKey + 1);
      } else {
        alert("Could not generate summary.");
      }
    } catch (error) {
      alert("Error generating summary.");
      console.error(error);
    } finally {
      setGeneratingSummary(false);
    }
  };

  return (
    <>
      <div className="min-h-[10vh]">
        <NavbarAfterLogin />
      </div>

      <div className="flex items-center justify-center flex-col py-6 px-4">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center">Create a Blog</h2>
        <p className="text-gray-400 underline text-center">Start writing your blog now!</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              Blog Title:
            </label>
            <input
              id="title"
              name="blogTitle"
              type="text"
              placeholder="Blog Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {title && (
            <div>
              <button
                type="button"
                onClick={getSummary}
                className="w-full sm:w-auto rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                {generatingSummary ? "Generating Summary..." : "Get Summary"}
              </button>
            </div>
          )}

          <div>
            <label htmlFor="category" className="block font-medium mb-1">
              Select Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">N/A</option>
              <option value="Technology">Technology</option>
              <option value="Sports">Sports</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Business">Business</option>
              <option value="Science">Science</option>
              <option value="Travel">Travel</option>
            </select>
          </div>

          <div>
            <label htmlFor="image" className="block font-medium mb-1">
              Cover Image:
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="block w-full text-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
            />
          </div>

          <div>
            <p className="font-medium mb-1">Blog Content:</p>
            <QuillEditor
              key={editorKey}
              value={content}
              onChange={(value: string) => setContent(value)}
              placeholder="Write your content here..."
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto rounded-md bg-indigo-600 px-6 py-2 text-white font-semibold hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateBlogPage;
