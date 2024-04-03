// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Import the necessary functions from the firestore module
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { isSupported as isAnalyticsSupported, getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2pdQeKSTRyv1oM2l9XzmM6Rd7O4iRGZM",
  authDomain: "cprg306-todoapp.firebaseapp.com",
  projectId: "cprg306-todoapp",
  storageBucket: "cprg306-todoapp.appspot.com",
  messagingSenderId: "895948289557",
  appId: "1:895948289557:web:f7b46a1d2d7c047e90001c",
  measurementId: "G-DHVKE9BEX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get auth and Firestore objects
const auth = getAuth(app);
const firestore = getFirestore(app);

// Function to update user document in Firestore
async function updateUser(uid, userData) {
  const userDocRef = doc(firestore, 'users', uid);
  try {
    await setDoc(userDocRef, userData, { merge: true });
    console.log('User data updated successfully');
  } catch (error) {
    console.error('Error updating user data:', error);
  }
}

// Verify Firestore import
if (!firestore) {
  console.error("Firestore is not imported correctly.");
}

// Export the auth object
// Export the auth object and updateUser function
export { auth, firestore, updateUser };

// Check if Firebase Analytics is supported before initializing
if (isAnalyticsSupported()) {
  const analytics = getAnalytics(app);
}


// Optionally, you can export other Firebase objects as needed
export default app;