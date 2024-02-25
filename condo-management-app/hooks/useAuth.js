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
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [userValues, setUserValues] = useState({});
  const herokuBackendUrl =
    "http://sleepy-bastion-87226-0172f309845e.herokuapp.com"; // localhost:8080

  useEffect(() => {
    var unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        getUservalues(user);
        navigation.navigate("BottomNavigator");
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

  const getUservalues = async (user) => {
    const tokenId = await getIdToken(user);

    fetch(herokuBackendUrl + "/initializeUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenId: tokenId,
        email: user.email,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          setUserValues(data.userValues);
        });
      }
    });
  };

  const updateProfileInfo = async (newState) => {
    const tokenId = await getIdToken(user);

    fetch(herokuBackendUrl + "/updateUserValues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenId: tokenId,
        userValues: newState,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          setUserValues(data.userValues);
        });
      }
    });
  };

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

  const addProperty = async (propertyValues) => {
    const tokenId = await getIdToken(user);

    fetch(herokuBackendUrl + "/addProperty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenId: tokenId,
        propertyValues: propertyValues,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          if (!userValues.propertiesOwned) {
            userValues.propertiesOwned = {};
          }
          setUserValues({
            ...userValues,
            propertiesOwned: {
              ...userValues.propertiesOwned,
              ...data.newPropertyOwned,
            },
          });
        });
      }
    });
  };

  const addPropertyFile = async (dataForm) => {
    const tokenId = await getIdToken(user);
    dataForm.append("tokenId", tokenId);
    fetch(herokuBackendUrl + "/addPropertyFile", {
      method: "POST",
      body: dataForm,
      redirect: "follow",
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          if (!userValues.propertiesOwned[dataForm.get("propertyID")]) {
            userValues.propertiesOwned[dataForm.get("propertyID")].files = {};
          }
          setUserValues({
            ...userValues,
            propertiesOwned: {
              ...userValues.propertiesOwned,
              [dataForm.get("propertyID")]: {
                ...userValues.propertiesOwned[dataForm.get("propertyID")],
                files: {
                  ...userValues.propertiesOwned[dataForm.get("propertyID")]
                    .files,
                  ...data.newFileUploaded,
                },
              },
            },
          });
        });
      }
    });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      emailLogin,
      emailSignup,
      updateProfileInfo,
      addProperty,
      addPropertyFile,
      userValues,
    }),
    [user, userValues]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
