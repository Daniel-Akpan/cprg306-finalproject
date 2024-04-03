"use client";

// Import necessary modules
import React, { useState, useEffect } from "react";
import { auth, updateUser } from "@/app/firebase"; // Import updateUser function

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [showEditPage, setShowEditPage] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        // Fetch user data from Firebase auth
        setName(user.displayName || ""); // Set name from Firebase auth
        // Set an empty bio for now
        setBio(""); 
      } else {
        // User is signed out
        // Clear name and bio
        setName("");
        setBio("");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditProfile = () => {
    setShowEditPage(true);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the updateUser function to update user data in Firestore
    await updateUser(auth.currentUser.uid, { name, bio });
    console.log('Profile updated:', { name, bio });
    // Close the edit menu
    setShowEditPage(false);
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
      {showEditPage ? (
        // Render the edit profile form
        <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Bio:</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Save</button>
          </form>
        </div>
      ) : (
        // Render the profile information
        <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Profile Page</h1>
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-black text-white mb-4">
            <span className="text-4xl">👤</span> {/* Placeholder icon */}
          </div>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Bio:</strong> {bio}
          </p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
        </div>
      )}
      {/* "Go to Homepage" button */}
      <div className="text-center mt-4">
        <a href="/" className="text-blue-500 hover:underline">
          Log Out
        </a>
      </div>
    </div>
  );
};

export default ProfilePage;
