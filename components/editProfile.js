"use client";
	 
import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation"; 
 
const useNavigation = dynamic(() => import('next/navigation').then((mod) => mod.useNavigation), { ssr: false });

function EditProfile({ closeEditProfile, initialName, initialBio, setNames, setBio }) {
  const router = useRouter();
  const [name, setName] = React.useState(initialName);
  const [bio, setLocalBio] = React.useState(initialBio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Profile updated:', { name, bio });
    await router.push('/profile');
    setNames(name);
    setBio(bio);
    closeEditProfile();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-black text-white mb-4">
          <span className="text-4xl">👤</span> {/* Placeholder icon */}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Bio:</label>
            <textarea value={bio} onChange={(e) => setLocalBio(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;