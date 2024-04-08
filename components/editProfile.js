import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "../app/firebase.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function EditProfile({ closeEditProfile, initialName, initialBio, setNames, setBio }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [bio, setLocalBio] = useState(initialBio);
  const [profileImage, setProfileImage] = useState(null);

  const storage = getStorage();

  useEffect(() => {
    // Fetch the profile image URL from Firestore
    const db = getFirestore();
    const profileImagesCollectionRef = collection(db, 'profileImages');
    getDocs(profileImagesCollectionRef)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { imageUrl, userId } = doc.data();
          // console.log("imageUrl: ", imageUrl)
          if (userId === firebaseAuth.currentUser.uid) {
            getDownloadURL(ref(getStorage(), imageUrl))
              .then((url) => {
                setProfileImage(url);
              })
              .catch((error) => {
                console.error('Error getting download URL:', error);
              });
          }
        });
      })
      .catch((error) => {
        console.error('Error getting documents:', error);
      });
  }, []); // Ensure the effect runs only once on component mount

  const handleFileUpload = async (file) => {
    const storageRef = ref(firebaseStorage, `profile_images/${file.name}`); 
    getDownloadURL(ref(storage, `profile_images/${file.name}`)).then((url)=>{console.log("url: ", url)})
    console.log("storage ref: ", storageRef)
    // Upload file to storage
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    setProfileImage(downloadURL); // Set the profile image URL
  
    return downloadURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Profile updated:', { name, bio });
  
    // Perform file upload
    const fileInput = document.getElementById('profileImage');
    if (fileInput.files.length > 0) {
      await handleFileUpload(fileInput.files[0]);
    }
  
    await router.push('/profile');
    setNames(name);
    setBio(bio);
    closeEditProfile();
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md border-2 border-black">
        <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-black text-white mb-4">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-4xl">👤</span>
          )}
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
          {/* File input for image upload */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image:</label>
            <input id="profileImage" type="file" accept="image/*" className="w-full" />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
