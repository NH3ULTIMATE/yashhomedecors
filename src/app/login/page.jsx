"use client";
import React, { useState } from "react";
import Intro from "@/components/Intro";

function Page() {
  const [form, setForm] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  return (
    <main className="  flex flex-row justify-center items-center px-15 text-[#ededed] min-h-screen bg-[url('/login.jpg')] bg-left bg-no-repeat bg-cover  ">
      <div className=" flex flex-col gap-[80px] p-8 rounded-[40px] backdrop-blur-3xl ">
        <div className="">
          <p className="text-md">START FOR FREE</p>
          <h1 className="text-4xl">Create new account.</h1>
        </div>
        <form
          action="submit"
          className="flex flex-col gap-6 [&>input]:rounded-3xl [&>input]:border-2 [&>input]:border-black [&>input]:p-4"
        >
          <div className="flex flex-row gap-6 [&>input]:rounded-3xl [&>input]:text-[#ededed] [&>input]:border-2 [&>input]:border-black [&>input]:p-4 ">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div className="flex flex-row items-center justify-between gap-6  [&>button]:rounded-full [&>button]:w-full [&>button]:p-4 [&>button]:border-2 [&>button]:border-black">
            <button>Create account</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Page;
