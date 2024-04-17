import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url('/background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-bold mb-4 text-center">
        Organize your work <br></br> and life, finally.
      </h1>
      <p className="text-lg mb-8 text-center">
        Become focused, organized, <br></br>and calm with our To-do-list
      </p>
      <div className="p-4 border border-black rounded-md max-w-md mx-auto bg-white">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Link href="/sign-up">
              <button className="text-orange-500 cursor-pointer bg-transparent border border-orange-500 px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-orange-500 hover:text-white">
                Sign Up
              </button>
            </Link>
          </div>
          <div>
            <Link href="/log-in">
              <button className="text-blue-500 cursor-pointer bg-transparent border border-blue-500 px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
