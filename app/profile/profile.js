'use client';

import React, { useState } from "react";
import EditProfile from "@/components/editProfile";

const ProfilePage = () => {
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState("Some bio information");
  const [showEditPage, setShowEditPage] = useState(false);

  const handleEditProfile = () => {
    setShowEditPage(true);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {showEditPage ? (
        <EditProfile
          closeEditProfile={() => setShowEditPage(false)}
          initialName={name}
          initialBio={bio}
          setNames={setName}
          setBio={setBio}
        />
      ) : (
        <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Profile Page</h1>
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-black text-white mb-4">
            <span className="text-4xl">👤</span> {/* Placeholder icon */}
          </div>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Bio:</strong> {bio}</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={handleEditProfile}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

