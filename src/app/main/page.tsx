"use client";
import React, { useState } from "react";
import NavbarAfterLogin from "../components/NavbarAfterLogin";
import Link from "next/link";
import CreateBlogPage from "../create-a-blog/page";
import MyBlogsPage from "../my-blogs/page";

function MainPage() {
  const [activeSession, setActiveSession] = useState("all-blogs")
  const username = localStorage.getItem("username");
  return (
    <>
    <div className="min-h-[10vh]">
      <NavbarAfterLogin/>
    </div>
      <section className=" max-h-[90vh] p-10 overflow-y-auto scrollbar-hide">
        
      </section>

    </>
  );
}

export default MainPage;
