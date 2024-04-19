/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Success. The user is logged in", userCredential.user);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email); // Send password reset email
      setError(null); // Reset error if any
      alert("Password reset email sent. Please check your email.");
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Sign in with Google provider using Firebase
      const result = await signInWithPopup(auth, provider);
      console.log("Success. User signed in with Google", result.user);
      setIsAuthenticated(true);
    } catch (error) {
      // An error occurred. Set error message to be displayed to user
      setError(error.message);
    }
  };

  // Function to handle Facebook sign-in
  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      // Sign in with Facebook provider using Firebase
      const result = await signInWithPopup(auth, provider);
      console.log("Success. User signed in with Facebook", result.user);
      // Redirect or perform further actions as needed
    } catch (error) {
      // An error occurred. Set error message to be displayed to user
      setError(error.message);
    }
  };

  // Use useEffect to redirect upon successful login
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/profile"; // Redirect to the home page
    }
  }, [isAuthenticated]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url('/background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Log In</h2>
          <p className="text-gray-600 mb-8">Log in to your account</p>
        </div>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
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
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
          </div>
          {/* Forgot Password link */}
          <div className="text-center mt-4">
            <button
              className="text-blue-500 hover:underline"
              onClick={handleForgotPassword}
              type="button"
            >
              Forgot Password?
            </button>
          </div>
        </form>
        {/* Google Sign-in button */}
        <div className="text-center mt-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleGoogleSignIn}
          >
            Log In with Google
          </button>
        </div>
        {/* Facebook Sign-in button */}
        <div className="text-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleFacebookSignIn}
          >
            Log In with Facebook
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
