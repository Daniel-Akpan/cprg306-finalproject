import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to our to-do app</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link href="/sign-up">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded block text-center">
            Sign Up
          </button>
        </Link>
        <Link href="/log-in">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded block text-center">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;