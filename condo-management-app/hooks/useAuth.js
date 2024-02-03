import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { auth, db } from "../config/firebaseConfig";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getIdToken,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // TODO: dynamically get this info
  const navigation = useNavigation();
  const [userValues, setUserValues] = useState({});

  useEffect(() => {
    var unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        getIdToken(user).then((idToken) => {
          console.log(idToken);
          navigation.navigate("ProfileScreen");
        });
      } else {
        navigation.navigate("Register");
        //check purchases was initialized
        if (userValues) {
          setUserValues({});
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function emailLogin(setError, email, password, isRegister = false) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      })
      .catch((error) => {
        if (isRegister) {
          //Login from register page
          setError("auth/email-already-in-use");
        } else {
          setError(error.code);
        }
      });
  }

  const emailSignup = (setError, email, password) => {
    console.log("emailSignup");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
      })
      .catch((error) => {
        // An error occurred during sign in

        if (error.code === "auth/email-already-in-use") {
          emailLogin(setError, email, password, true);
        } else {
          setError(error.code);
        }
      });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      emailLogin,
      emailSignup,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
