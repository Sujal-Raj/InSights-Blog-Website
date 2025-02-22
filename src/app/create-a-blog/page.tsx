"use client"
import React, { useState } from "react";
import QuillEditor from "../components/QuillEditor";
import 'quill/dist/quill.snow.css';


function CreateBlogPage() {

    const [setContent, setSetContent] = useState("")
  return (
    <>
      <div className="w-1/2 mx-auto ">
        <form action="">
        <div>
              <label htmlFor="email" className="block font-medium">
                Blog Title:
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                //   value={}
                //   onChange={(e)=> setUser({...user, email: e.target.value})}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
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
        </form>
      </div>
    </>
  );
}

export default CreateBlogPage;
