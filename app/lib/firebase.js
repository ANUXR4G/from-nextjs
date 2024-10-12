// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxnWXiu4QYV6-Qwh13se0L19JkNvXi5rQ",
  authDomain: "justdata-19b10.firebaseapp.com",
  databaseURL: "https://justdata-19b10-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "justdata-19b10",
  storageBucket: "justdata-19b10.appspot.com",
  messagingSenderId: "1095049387809",
  appId: "1:1095049387809:web:b4b7628feee35d7e1ba860",
  measurementId: "G-XJSQ7FSP7R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);