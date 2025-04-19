"use client"
import React, { useState } from 'react'
import { FloatingDock } from "@/app/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconMenu2,
  IconX
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

function NavbarAfterLogin() {
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  // const username = localStorage.getItem("username");

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <Image
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  const handleLogout = () => {
    setLoading(true);
    localStorage.clear();
    router.push("/");
    // setActiveSession("");
    // Clear any cookies set by the app
    document.cookie = "yourCookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoading(false);
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <>
      <nav className="min-h-[10vh] flex justify-between items-center px-4 md:px-10 fixed top-0 w-full z-50 bg-[#0a0a0a]">
        <h1 className="text-xl/7 font-bold text-white sm:text-3xl sm:tracking-tight capitalize">
          Welcome
          {/* Welcome,{username} */}
        </h1>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <IconX className="h-6 w-6" />
          ) : (
            <IconMenu2 className="h-6 w-6" />
          )}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex items-center gap-4 text-white">
            <li>
              <Link href={"/main"}>All Blogs</Link>
            </li>
            <li>
              <Link href={"/create-a-blog"}>Create a Blog</Link>
            </li>
            <li>
              <Link href={"/my-blogs"}>My Blogs</Link>
            </li>
          </ul>
          <button 
            onClick={handleLogout}
            className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
          >
            {loading ? "Logging out..." : "Log out"}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[10vh] left-0 right-0 bottom-0 bg-[#0a0a0a] z-40 flex flex-col p-4">
          <ul className="flex flex-col space-y-4 text-white text-lg">
            <li>
              <Link href={"/main"} onClick={() => setMobileMenuOpen(false)}>All Blogs</Link>
            </li>
            <li>
              <Link href={"/create-a-blog"} onClick={() => setMobileMenuOpen(false)}>Create a Blog</Link>
            </li>
            <li>
              <Link href={"/my-blogs"} onClick={() => setMobileMenuOpen(false)}>My Blogs</Link>
            </li>
          </ul>
          <div className="mt-6">
            <button 
              onClick={handleLogout}
              className="w-full shadow-[0_0_0_3px_#000000_inset] px-6 py-3 bg-transparent border border-white text-white rounded-lg font-bold transition duration-300"
            >
              {loading ? "Logging out..." : "Log out"}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default NavbarAfterLogin