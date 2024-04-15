// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const firebaseStorage = getStorage(app);

// Function to update user document in Firestore
async function updateUser(uid, userData) {
  const userDocRef = doc(firestore, "users", uid);
  try {
    await setDoc(userDocRef, userData, { merge: true });
    console.log("User data updated successfully");
  } catch (error) {
    console.error("Error updating user data:", error);
  }
}

// Export the auth object, updateUser function, doc, and onSnapshot
export {
  auth,
  firestore,
  updateUser,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  onSnapshot,
  firebaseStorage,
  analytics,
};

// Verify Firestore import
if (!firestore) {
  console.error("Firestore is not imported correctly.");
}

export default app;
