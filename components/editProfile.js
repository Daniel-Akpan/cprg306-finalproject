import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage, firestore, updateDoc, doc, getDoc } from "../app/firebase.js"; // Import Firebase functions
import { auth } from "../app/firebase.js"; // Import firebaseAuth

function EditProfile({ closeEditProfile, initialName, initialBio, handleSubmit, profileImage, setProfileImage }) {
    const [name, setName] = useState(initialName);
    const [bio, setLocalBio] = useState(initialBio);

    const handleFileUpload = async (file) => {
        const storageRef = ref(firebaseStorage, `profile_images/${file.name}`);
        // Upload file to storage
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        setProfileImage(downloadURL); // Update profile image in parent component

        // Update user info in Firestore
        const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
        // Check if the document exists before updating it
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
            await updateDoc(userDocRef, {
                profileImage: downloadURL // Update profileImage URL in the database
            });
            console.log('Profile image updated in Firestore');
        } else {
            console.error('User document does not exist');
        }

        return downloadURL;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Call the handleSubmit function passed from the parent component
        handleSubmit({ name, bio });
    };

    useEffect(() => {
        setName(initialName);
        setLocalBio(initialBio);
    }, [initialName, initialBio]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md border-2 border-black text-center">
                <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
                <div className="border border-black w-24 h-24 rounded-full overflow-hidden mb-4 mx-auto">
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-24 h-24 object-cover rounded-full"
                        />
                    ) : (
                        <span className=""></span>
                    )}
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Bio:</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setLocalBio(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        ></textarea>
                    </div>
                    {/* File input for image upload */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Profile Image:</label>
                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e.target.files[0])}
                            className="w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mx-auto block"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
