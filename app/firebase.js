// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth function
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Get auth object
const auth = getAuth(app);

// Export the auth object
export { auth };

// Optionally, you can export other Firebase objects as needed
export default app;