// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
async function updateUserDocument(uid, userData) {
  const userDocRef = doc(firestore, 'users', uid);
  await setDoc(userDocRef, userData, { merge: true });
}

// Listen for authentication state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    const userData = {
      name: user.displayName,
      bio: "", // You can fetch bio from user input
      profilePicture: user.photoURL
    };
    try {
      await updateUserDocument(uid, userData);
      console.log("User data updated successfully");
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  } else {
    // User is signed out
    // Handle sign-out actions if needed
  }
});

// Export the auth object
export { auth, firestore };

// Optionally, you can export other Firebase objects as needed
export default app;