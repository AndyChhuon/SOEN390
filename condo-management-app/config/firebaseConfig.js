// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  browserSessionPersistence,
  getReactNativePersistence,
} from "firebase/auth";
import { get, getDatabase } from "firebase/database";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDnHXfchED8ogSHvzR1tKq7kPaK7faJEI",
  authDomain: "condo-management-41b07.firebaseapp.com",
  databaseURL: "https://condo-management-41b07-default-rtdb.firebaseio.com",
  projectId: "condo-management-41b07",
  storageBucket: "condo-management-41b07.appspot.com",
  messagingSenderId: "91419278656",
  appId: "1:91419278656:web:7c0a9967b4976267b64ea5",
  measurementId: "G-K0XQXEJ43G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence:
    Platform.OS === "web"
      ? browserSessionPersistence
      : getReactNativePersistence(AsyncStorage),
});
export const db = getDatabase(app);

export default app;
