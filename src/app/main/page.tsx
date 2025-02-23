"use client";
import React, { useState } from "react";
import NavbarAfterLogin from "../components/NavbarAfterLogin";
import Link from "next/link";
import CreateBlogPage from "../create-a-blog/page";

function MainPage() {
  const [activeSession, setActiveSession] = useState("all-blogs")
  const username = localStorage.getItem("username");
  return (
    <>
    <div className="min-h-[10vh]">
      <NavbarAfterLogin setActiveSession={setActiveSession}/>
    </div>
      <section className=" max-h-[90vh] p-10 overflow-y-auto scrollbar-hide">
        {activeSession === "create-a-blog" && <CreateBlogPage/>}
      </section>

    </>
  );
}

export default MainPage;
