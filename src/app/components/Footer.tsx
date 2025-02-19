"use client"
import React from 'react'
import { FaTwitter, FaYoutube, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <>
    <footer className=" text-gray-400 py-10 px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <h2 className="text-white text-2xl font-bold flex items-center">
            🚀 Insights
          </h2>
          <p className="mt-3 text-gray-400 text-md">
            Explore, write, and share insightful blogs with a vibrant community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">About</h3>
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-white transition">Features</li>
              <li className="cursor-pointer hover:text-white transition">Pricing</li>
              <li className="cursor-pointer hover:text-white transition">Support</li>
              <li className="cursor-pointer hover:text-white transition">Forums</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Project</h3>
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-white transition">Contribute</li>
              <li className="cursor-pointer hover:text-white transition">Media assets</li>
              <li className="cursor-pointer hover:text-white transition">Changelog</li>
              <li className="cursor-pointer hover:text-white transition">Releases</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Community</h3>
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-white transition">Join Discord</li>
              <li className="cursor-pointer hover:text-white transition">Follow on Twitter</li>
              <li className="cursor-pointer hover:text-white transition">Email newsletter</li>
              <li className="cursor-pointer hover:text-white transition">GitHub discussions</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© 2020 mantine.dev. All rights reserved.</p>
        <div className="flex space-x-5 mt-4 md:mt-0">
          <FaTwitter className="text-gray-400 hover:text-white cursor-pointer" size={22} />
          <FaYoutube className="text-gray-400 hover:text-white cursor-pointer" size={22} />
          <FaInstagram className="text-gray-400 hover:text-white cursor-pointer" size={22} />
          <FaGithub className="text-gray-400 hover:text-white cursor-pointer" size={22} />
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer