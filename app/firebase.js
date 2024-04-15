// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
// import { isSupported as isAnalyticsSupported, getAnalytics } from "firebase/analytics";
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
  apiKey: "AIzaSyC2pdQeKSTRyv1oM2l9XzmM6Rd7O4iRGZM",
  authDomain: "cprg306-todoapp.firebaseapp.com",
  projectId: "cprg306-todoapp",
  storageBucket: "cprg306-todoapp.appspot.com",
  messagingSenderId: "895948289557",
  appId: "1:895948289557:web:f7b46a1d2d7c047e90001c",
  measurementId: "G-DHVKE9BEX3",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
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
