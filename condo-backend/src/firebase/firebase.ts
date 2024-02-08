const admin = require("firebase-admin");
const serviceAccount = require("../secrets/serviceAccountKeys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://condo-management-41b07-default-rtdb.firebaseio.com",
});

const getIdFromToken = async (idToken: String) => {
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  return decodedToken.uid;
};

const db = admin.database();
const usersRef = db.ref("users");

const updateUserValuesDB = (id: String, userValues: Object) => {
  usersRef.child(id).update(userValues);
};

const userExists = async (id: String) => {
  const snapshot = await usersRef.child(id).once("value");
  return snapshot.exists();
};

const getUserValues = async (id: String) => {
  const snapshot = await usersRef.child(id).once("value");
  return snapshot.val();
};

export { getIdFromToken, updateUserValuesDB, userExists, getUserValues };
