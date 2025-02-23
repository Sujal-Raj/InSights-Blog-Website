"use client"
import React, { useState } from "react";
import QuillEditor from "../components/QuillEditor";
import 'quill/dist/quill.snow.css';


function CreateBlogPage() {

    const [setContent, setSetContent] = useState("")
  return (
    <>
      <div className="flex items-center justify-center flex-col py-5">
        <h2 className="text-4xl font-semibold">Create a Blog</h2>
        <p className="text-gray-400 underline">Start writing your blog now!</p>
      </div>
      <div className="w-1/2 mx-auto ">
        <form action="">
            <div>
              <label htmlFor="email" className="block font-medium">
                Blog Title:
              </label>
              <div className="mt-2 mb-2">
                <input
                  id="title"
                  name="blogTitle"
                  type="text"
                  placeholder="Blog Title"
                  required
                //   value={}
                //   onChange={(e)=> setUser({...user, email: e.target.value})}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="category" className="block font-medium">
                Select Category:
              </label>
              <div className="mt-2 mb-2">
                <select name="category" id="category" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                    <option value="" defaultValue={"General"}>N/A</option>
                    <option value="1">Technology</option>
                    <option value="2">Sports</option>
                    <option value="3">Lifestyle</option>
                    <option value="4">Business</option>
                    <option value="5">Science</option>
                    <option value="6">Travel</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="img" className="block font-medium">
                Cover Image
              </label>
              <div className="mt-2 mb-2">
                <input id="img" className="lock w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" type="file"  />
              </div>
            </div>
        <div>
            <p className="mb-1">Blog Content:</p>
            <QuillEditor
            value={setContent}
            onChange={(value:string) => setSetContent(value) }
            placeholder="Write your content here..."
            />
        </div>
        <div>
              <button
                type="submit"
                className=" rounded-md bg-indigo-600 px-4 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Publish
              </button>
            </div>
        </form>
      </div>
    </>
  );
}

export default CreateBlogPage;
