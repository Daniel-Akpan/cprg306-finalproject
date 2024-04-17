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
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded block text-center">
                Sign Up
              </button>
            </Link>
          </div>
          <div>
            <Link href="/log-in">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded block text-center">
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
