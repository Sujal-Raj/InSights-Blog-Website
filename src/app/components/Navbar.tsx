"use client";

import { useRouter } from "next/navigation";


function Navbar() {
    const router = useRouter();
    const LoginPageRedirect = () => {
        router.push("/login");
    };
  return (
    <nav className="h-[10vh] flex justify-between items-center px-10">
        <h1 className="text-2xl/7 font-bold text-black dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">InSights</h1>
      <button 
        onClick={LoginPageRedirect}
      className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
        Login
      </button>  
    </nav>
  )
}

export default Navbar