"use client";

import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth, firestore, doc, setDoc } from "../firebase"; // Import the auth object and Firestore utilities

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailPasswordSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create user account with Firebase
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Create a user document in Firestore
      const userDocRef = doc(firestore, "users", authUser.user.uid);
      await setDoc(userDocRef, {
        email: authUser.user.email,
        // Other user data as needed
      });

      console.log("Success. The user is created in Firebase", authUser);
      // Redirect or perform further actions as needed
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Sign in with Google provider using Firebase
      const result = await signInWithPopup(auth, provider);
      console.log("Success. User signed in with Google", result.user);
      // Redirect or perform further actions as needed
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      // Sign in with Facebook provider using Firebase
      const result = await signInWithPopup(auth, provider);
      console.log("Success. User signed in with Facebook", result.user);
      // Redirect or perform further actions as needed
    } catch (error) {
      setError(error.message);
    }
  };

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
          <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
          <p className="text-gray-600 mb-8">Create an account to get started</p>
        </div>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleEmailPasswordSubmit}
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
              Sign Up with Email
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            onClick={handleGoogleSignIn}
          >
            Sign Up with Google
          </button>
        </div>
        <div className="text-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleFacebookSignIn}
          >
            Sign Up with Facebook
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="/log-in" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
        <div className="text-center mt-4">
          <button className="text-orange-500 cursor-pointer bg-transparent border border-orange-500 px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-orange-500 hover:text-white">
            <a href="/"> Home Page</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
