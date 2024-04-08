"use client";

import React, { useState } from "react";
import EditProfile from "@/components/editProfile";

const ProfilePage = ({ profileImage, name, bio, setName, setBio }) => {
  const [showEditPage, setShowEditPage] = useState(false);

  const handleEditProfile = () => {
    setShowEditPage(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {showEditPage ? (
        <EditProfile
          closeEditProfile={() => setShowEditPage(false)}
          initialName={name}
          initialBio={bio}
          setNames={setName}
          setBio={setBio}
        />
      ) : (
        <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md border-2 border-black">
          <h1 className="text-2xl font-semibold mb-4">Profile Page</h1>
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-black text-white mb-4">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-4xl">👤</span> // Placeholder icon
            )}
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
