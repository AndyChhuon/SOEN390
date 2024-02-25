const admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();

const serviceAccount = process.env.SERVICE_ACCOUNT_KEYS
  ? JSON.parse(process.env.SERVICE_ACCOUNT_KEYS)
  : {};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://condo-management-41b07-default-rtdb.firebaseio.com",
});

const getIdFromToken = async (idToken: String) => {
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  return decodedToken.uid;
};

const db = admin.database();

const updateUserValuesDB = (id: String, userValues: Object) => {
  db.ref("users").child(id).update(userValues);
};

const addToPropertiesOwned = async (id: String, propertyValues: Object) => {
  const key = db
    .ref("users")
    .child(`${id}/propertiesOwned`)
    .push(propertyValues)
    .getKey();
  return key;
};

const addToPropertyFiles = (
  id: String,
  propertyID: String,
  fileType: string,
  fileUrl: String
) => {
  db.ref("users")
    .child(`${id}/propertiesOwned/${propertyID}/files`)
    .update({ [fileType]: fileUrl });
};

const userExists = async (id: String) => {
  const snapshot = await db.ref("users").child(id).once("value");
  return snapshot.exists();
};

const getUserValues = async (id: String) => {
  const snapshot = await db.ref("users").child(id).once("value");
  return snapshot.val();
};

export {
  getIdFromToken,
  updateUserValuesDB,
  userExists,
  getUserValues,
  addToPropertiesOwned,
  addToPropertyFiles,
};
