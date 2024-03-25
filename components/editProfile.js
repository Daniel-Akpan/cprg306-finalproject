"use client";
	 
import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation"; 
 
const useNavigation = dynamic(() => import('next/navigation').then((mod) => mod.useNavigation), { ssr: false });
 
function EditProfile({closeEditProfile, setNames}) {
  const navigation = useNavigation();
  const router = useRouter();
 
  const [name, setName] = React.useState('');
  const [bio, setBio] = React.useState('');
 
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update profile data (e.g., make API call)
    console.log('Profile updated:', { name, bio });
    // Navigate back to profile page
    await router.push('/profile');
    setNames(name)
    closeEditProfile();
  };
 
  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Bio:</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
 
export default EditProfile;
