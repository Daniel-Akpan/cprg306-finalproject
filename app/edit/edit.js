"use client";
	 
import React from 'react';
import dynamic from 'next/dynamic'; // Import dynamic for dynamic imports
import { useRouter } from "next/router"; // Import useRouter from next/compat/router
 
const useNavigation = dynamic(() => import('next/navigation').then((mod) => mod.useNavigation), { ssr: false });
 
function ProfileEditPage() {
  const navigation = useNavigation();
  const router = useRouter();
 
  // State for form inputs
  const [name, setName] = React.useState('');
  const [bio, setBio] = React.useState('');
 
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update profile data (e.g., make API call)
    console.log('Profile updated:', { name, bio });
    // Navigate back to profile page
    await router.push('/profile'); // Navigate back to profile page after saving
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
 
export default ProfileEditPage;
