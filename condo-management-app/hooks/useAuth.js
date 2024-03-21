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
import { set } from "firebase/database";

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

  const updatePropertyFinancials = async (propertyId, propertyFinancials) => {
    const tokenId = await getIdToken(user);

    fetch(herokuBackendUrl + "/updatePropertyFinancials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenId: tokenId,
        propertyId: propertyId,
        propertyFinancials: propertyFinancials,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          setUserValues({
            ...userValues,
            propertiesOwned: {
              ...userValues.propertiesOwned,
              [propertyId]: {
                ...userValues.propertiesOwned[propertyId],
                financials: propertyFinancials,
              },
            },
          });
        });
      }
    });
  };

  const generatePdf = async (propertyId) => {
    const tokenId = await getIdToken(user);

    try {
      const response = await fetch(herokuBackendUrl + "/generateReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenId: tokenId,
          propertyId: propertyId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      // Extracting filename from Content-Disposition header
      const disposition = response.headers.get("Content-Disposition");
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      const filename = matches && matches[1] ? matches[1] : "report.pdf";

      // Initiate download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const generateChatResponse = async (messagesArr, setMessages) => {
    const tokenId = await getIdToken(user);
    const response = await fetch(herokuBackendUrl + "/generateResponse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenId: tokenId,
        messagesArr: messagesArr,
      }),
    });

    let currentMessage = "";

    // get response stream
    const reader = response.body.getReader();
    reader.read().then(function processText({ done, value }) {
      if (done) {
        return;
      }

      // decode data
      const text = new TextDecoder("utf-8").decode(value);

      // append to current message
      currentMessage += text;

      setMessages([
        ...messagesArr,
        { content: currentMessage, role: "assistant" },
      ]);

      // read more
      return reader.read().then(processText);
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
      updatePropertyFinancials,
      generatePdf,
      generateChatResponse,
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
