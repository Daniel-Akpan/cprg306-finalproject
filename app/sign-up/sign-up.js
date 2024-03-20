"use client";
import React, { useState } from "react";
import Link from "next/link";

const SignUp = () => {
    // State variable to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto">
        {/* Title and description */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
          <p className="text-gray-600 mb-8">Create an account to get started</p>
        </div>
        {/* Social Signup buttons */}
        <div className="mb-6 flex justify-center space-x-4">
          <a
            href="https://www.google.com/"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign up with Google
          </a>
          <a
            href="https://www.apple.com/"
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign up with Apple
          </a>
          <a
            href="https://www.facebook.com/"
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign up with Facebook
          </a>
        </div>
        {/* SignUp form */}
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
                {/* Password input with toggle button */}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up with Email
            </button>
          </div>
        </form>
         {/* Link to Log-in page */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a className="text-blue-500 hover:underline" href="/log-in">
              Log in
            </a>
          </p>
        </div>
        {/* "Go to Homepage" button */}
        <div className="text-center mt-4">
          <Link href="/">
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Go to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
