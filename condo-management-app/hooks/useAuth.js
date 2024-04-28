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

import { get, set } from "firebase/database";
import { Alert } from "react-native";

import { onAuthStateChanged,} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { get, set, ref, update } from "firebase/database";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [newPropertyCreated, setNewPropertyCreated] = useState(false);
  const [newRentInitiated, setNewRentInitiated] = useState(false);
  const [userValues, setUserValues] = useState({});

  // Holds the definitions of the roles
  const [roles, setRoles] = useState({});
  // Holds the mappings of the different employees to the different roles
  const [employeeRoles, setEmployeeRoles] = useState({});

  const herokuBackendUrl =
    "http://sleepy-bastion-87226-0172f309845e.herokuapp.com"; 
    // "http://localhost:8080";

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
          setNewPropertyCreated(true);
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


  const addNotification = async (message) => {
    if (!user) {
      console.error("No user is logged in!");
      return;
    }

    try {
      const tokenId = await getIdToken(user); // Assuming authentication token is needed

      const response = await fetch(herokuBackendUrl + "/addNotification", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenId}`
        },
        body: JSON.stringify({
          userId: user.uid, // Pass user ID if needed
          message: message,
          timestamp: Date.now() // Include timestamp if handled by frontend
        })
      });

      if (response.ok) {
        console.log("Notification added successfully!");
      } else {
        throw new Error('Failed to send notification');
      }
    } catch (error) {
      console.error("Failed to add notification:", error);
    }
  };


  const convertTimestamp = (timestamp) => {
    // Assuming the timestamp is in milliseconds
    return new Date(timestamp).toLocaleString(); // Adjust the string format as needed
  };

  const retrieveNotifications = async () => {
    if (!user) {
      console.error("No user is logged in!");
      return [];
    }

    try {
      const tokenId = await getIdToken(user); // Assuming authentication token is needed

      const response = await fetch(`${herokuBackendUrl}/getNotifications?userId=${user.uid}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenId}`
        }
      });

      if (response.ok) {
        const notifications = await response.json();
        console.log("Retrieved notifications:", notifications);

        let notificationsArray = Object.keys(notifications).map(key => ({
          id: key,
          ...notifications[key],
          timestamp: convertTimestamp(notifications[key].timestamp),
        }));

        // Sort by timestamp in descending order, assuming convertTimestamp returns a Date object
        notificationsArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        return notificationsArray;
      } else {
        throw new Error('Failed to retrieve notifications');
      }
    } catch (error) {
      console.error("Failed to retrieve notifications:", error);
      return [];
    }
  }


  const updateNotificationReadStatus = async (userId, notificationId, readStatus) => {
    if (!user) {
      console.error("No user ID provided!");
      return;
    }

    try {
      const tokenId = await getIdToken(user);

      const response = await fetch(`${herokuBackendUrl}/updateNotification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenId}`
          // Include the 'Authorization' header if your API requires authentication
        },
        body: JSON.stringify({
          userId: user.uid,
          notificationId: notificationId,
          read: readStatus,
        }),
      });

      if (response.ok) {
        console.log("Notification read status updated successfully!");
      } else {
        throw new Error('Failed to update notification read status');
      }
    } catch (error) {
      console.error("Error updating notification read status:", error);
    }
  };




  const getRentableProperties = async (setProperties) => {
    const tokenId = await getIdToken(user);

    fetch(herokuBackendUrl + "/getRentableProperties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenId: tokenId,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          setProperties(data);
          setNewPropertyCreated(false);
          return data;
        });
      }
    });
  };

  const startRenting = async (propertyId, setProperties) => {
    const tokenId = await getIdToken(user);

    fetch(herokuBackendUrl + "/addRenter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenId: tokenId,
        propertyId: propertyId,
      }),
    }).then((res) => {
      if (res.ok) {
        getRentableProperties(setProperties);
        setNewRentInitiated(true);
      }
    });
  };

  const getRentedProperties = async (setProperties) => {
    const tokenId = await getIdToken(user);

    fetch(herokuBackendUrl + "/getRentedProperties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenId: tokenId,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          setProperties(data);
          setNewRentInitiated(false);
          return data;
        });
      }
    });
  };

  const getPropertyAvailableTimes = async (
    propertyId,
    activity,
    date,
    setTimes
  ) => {
    const tokenId = await getIdToken(user);

    fetch(herokuBackendUrl + "/getPropertyAvailableTimes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenId: tokenId,
        propertyId: propertyId,
        activity: activity,
        date: date,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          setTimes(data);
          return data;
        });
      }
    });
  };

  const addScheduledActivity = async (
    propertyId,
    activity,
    date,
    selectedTimes,
    setTimes
  ) => {
    const tokenId = await getIdToken(user);

    fetch(herokuBackendUrl + "/addScheduledActivity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenId: tokenId,
        propertyId: propertyId,
        activity: activity,
        date: date,
        timeArr: selectedTimes,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          getUservalues(user);
          setTimes((times) =>
            times.filter((time) => !selectedTimes.includes(time))
          );
          return data;
        });
      }
    });

    // Function to add a new role
    const addRole = (roleName, permissions) => {
      // Here, we're assuming roles are stored at the 'roles' key in Firebase
      const roleRef = ref(db, `roles/${roleName}`);
      set(roleRef, permissions).then(() => {
        // On success, we update our state
        setRoles((prevRoles) => ({
          ...prevRoles,
          [roleName]: permissions,
        }));
      }).catch((error) => {
        console.error("Failed to add role:", error);
      });
    };

    const assignRoleToEmployee = (employeeId, roleName) => {
      // Here, we're assuming employee roles are stored at 'employeeRoles' key in Firebase
      const employeeRolesRef = ref(db, `employeeRoles/${employeeId}`);
      update(employeeRolesRef, { roleName }).then(() => {
        // On success, we update our state
        setEmployeeRoles((prevEmployeeRoles) => ({
          ...prevEmployeeRoles,
          [employeeId]: roleName,
        }));
      }).catch((error) => {
        console.error("Failed to assign role:", error);
      });
    };


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
      addNotification,
      retrieveNotifications,
      updateNotificationReadStatus,

      getRentableProperties,
      startRenting,
      getRentedProperties,
      getPropertyAvailableTimes,
      addScheduledActivity,
      newPropertyCreated,
      newRentInitiated,

      addRole,
      assignRoleToEmployee,
      roles,
      employeeRoles      
    }),
    [user, userValues, newPropertyCreated, newRentInitiated, roles, employeeRoles]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
