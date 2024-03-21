"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase signInWithEmailAndPassword function
import { auth } from "../firebase"; // Import the auth object

const Login = () => {
  // State variables for email, password, and error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Function to handle form submission
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      // Sign in user with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Redirect or perform further actions as needed
      console.log("Success. The user is logged in", userCredential.user);
    } catch (error) {
      // An error occurred. Set error message to be displayed to user
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto">
        {/* Title and description */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Log In</h2>
          <p className="text-gray-600 mb-8">Log in to your account</p>
        </div>
        {/* Login form */}
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error message if present */}
          <div className="text-center">
            {/* Login button */}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
        {/* Link to sign-up page */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        {/* "Go to Homepage" button */}
        <div className="flex justify-center mt-4">
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

export default Login;
