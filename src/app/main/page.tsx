"use client";
import React from "react";
import NavbarAfterLogin from "../components/NavbarAfterLogin";
import Link from "next/link";

function MainPage() {
  const username = localStorage.getItem("username");
  return (
    <>
      <nav className="min-h-[10vh] flex justify-between items-center px-10">
        <h1 className="text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight capitalize">
          Welcome,{username}
        </h1>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-4">
            <li className="">
              <Link href={""}>All Blogs</Link>
            </li>
            <li>
              <Link href={"/create-a-blog"}>Create a Blog</Link>
              
            </li>
            <li>
              <Link href={""}>My Blogs</Link>
              
            </li>
            <li>
              <Link href={""}>Profile</Link>
              
            </li>
          </ul>
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
            Log Out
          </button>
        </div>
      </nav>
      {/* <NavbarAfterLogin/> */}
    </>
  );
}

export default MainPage;
