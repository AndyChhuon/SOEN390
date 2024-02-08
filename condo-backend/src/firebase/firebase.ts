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
