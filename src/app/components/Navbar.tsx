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




// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";

// const Navbar = () => {
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLoginRedirect = () => {
//     router.push("/login");
//   };

//   return (
//     <nav className="w-full h-[10vh] px-4 sm:px-6 md:px-10 flex items-center justify-between bg-white dark:bg-black shadow-md relative z-50">
//       {/* Logo */}
//       <h1 className="text-2xl font-bold text-black dark:text-white sm:text-3xl">InSights</h1>

//       {/* Desktop Nav */}
//       <div className="hidden md:flex items-center space-x-6">
//         <a href="#features" className="text-black dark:text-white hover:underline">
//           Features
//         </a>
//         <a href="#testimonials" className="text-black dark:text-white hover:underline">
//           Testimonials
//         </a>
//         <a href="#footer" className="text-black dark:text-white hover:underline">
//           Contact
//         </a>
//         <button
//           onClick={handleLoginRedirect}
//           className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
//         >
//           Login
//         </button>
//       </div>

//       {/* Mobile Hamburger */}
//       <button
//         className="md:hidden text-black dark:text-white text-2xl"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         ☰
//       </button>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <div className="absolute top-full left-0 w-full bg-white dark:bg-black flex flex-col items-center space-y-4 py-4 md:hidden shadow-md">
//           <a href="#features" className="text-black dark:text-white hover:underline">
//             Features
//           </a>
//           <a href="#testimonials" className="text-black dark:text-white hover:underline">
//             Testimonials
//           </a>
//           <a href="#footer" className="text-black dark:text-white hover:underline">
//             Contact
//           </a>
//           <button
//             onClick={handleLoginRedirect}
//             className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
//           >
//             Login
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
