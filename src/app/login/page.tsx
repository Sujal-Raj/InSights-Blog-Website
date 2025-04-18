"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
      email: "",
      password: "",
    });

    const handleLogin = async (e:React.FormEvent) =>{
      e.preventDefault();
      // console.log(user);
      setLoading(true);

      try {
        const response = await axios.post("/api/users/login",user);
        localStorage.setItem("username",response.data.username);
        alert("Login Successful");
        setLoading(false);
        router.push("/main");
      } catch (error:unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("An unknown error occurred");
        }
        alert("Login Failed");
        setLoading(false);
      }
    }

    const redirectToHomePage = () => {
      router.push("/");
    }
  return (
    <>
      <nav className="h-[10vh] flex justify-between items-center px-10">
        <h1 onClick={redirectToHomePage} className="text-2xl/7 font-bold text-black dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
          InSights
        </h1>
      </nav>
      <div className="flex h-[90vh] flex-1 flex-col  px-6 py-12 lg:px-8 bg-gray-100 dark:bg-black">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Your Company"
            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight dark:text-white">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={user.email}
                  onChange={(e)=> setUser({...user, email: e.target.value})}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium "
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={user.password}
                  onChange={(e)=>setUser({...user, password: e.target.value})}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
              // onClick={handleLogin}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading?"Logging in...":"Login"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-base/6 text-gray-500">
            Don&apos;t have an account?{" "}
            {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign up now
            </a> */}
            <Link
              href="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500 uppercase"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
