import React, { useState, useEffect } from "react";
import Image from 'next/image'; // Import Image component
import EditProfile from "@/components/editProfile";
import { auth, firestore, updateUser, doc, onSnapshot, setDoc, getDoc } from "@/app/firebase"; // Import Firebase functions

function ProfilePage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showEditPage, setShowEditPage] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        // Fetch user data from Firestore
        const userDocRef = doc(firestore, 'users', user.uid);
        const unsubscribeFirestore = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setName(userData.name || ""); // Set name from Firestore
            setBio(userData.bio || ""); // Set bio from Firestore
            setProfileImage(userData.profileImage || null); // Set profile image from Firestore
          } else {
            console.log("No such document!");
          }
        });
        return () => unsubscribeFirestore();
      } else {
        // User is signed out
        // Clear name, bio, and profile image
        setName("");
        setBio("");
        setProfileImage(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditProfile = () => {
    setShowEditPage(true);
  };

  const handleEditProfileClose = () => {
    setShowEditPage(false);
  };

  const handleSubmit = async (formData) => {
    console.log('Profile updated:', formData);
    // Update user info in Firestore
    const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
    await updateUser(auth.currentUser.uid, formData);
    
    // If profileImage exists, update it in Firestore
    if (profileImage) {
      await setDoc(userDocRef, { profileImage }, { merge: true });
    }
    setShowEditPage(false);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {showEditPage ? (
        <EditProfile
          closeEditProfile={handleEditProfileClose}
          initialName={name}
          initialBio={bio}
          setNames={setName}
          setBio={setBio}
          handleSubmit={handleSubmit}
          profileImage={profileImage}
          setProfileImage={setProfileImage} // Pass setProfileImage as a prop
        />
      ) : (
        <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md border-2 border-black">
          <h1 className="text-2xl font-semibold mb-4">Profile Page</h1>
          <div className="border border-black w-40 h-40 object-cover rounded-full">
            {profileImage && (
              <Image
                src={profileImage}
                alt="Profile"
                width={200}
                height={200}
                className="w-40 h-40 object-cover rounded-full"
              />
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
      <div className="text-center mt-4">
        <a href="/" className="text-blue-500 hover:underline">
          Log Out
        </a>
      </div>
    </div>
  );
}

export default ProfilePage;
