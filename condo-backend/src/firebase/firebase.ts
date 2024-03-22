const admin = require('firebase-admin')
const dotenv = require('dotenv')
dotenv.config()

const serviceAccount = process.env.SERVICE_ACCOUNT_KEYS
  ? JSON.parse(process.env.SERVICE_ACCOUNT_KEYS)
  : {}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://condo-management-41b07-default-rtdb.firebaseio.com'
})

const getIdFromToken = async (idToken: string) => {
  const decodedToken = await admin.auth().verifyIdToken(idToken)
  return decodedToken.uid
}

const db = admin.database()

const updateUserValuesDB = (id: string, userValues: Object) => {
  db.ref('users').child(id).update(userValues)
}

const addToPropertiesOwned = async (id: string, propertyValues: Object) => {
  const key = db
    .ref('users')
    .child(`${id}/propertiesOwned`)
    .push(propertyValues)
    .getKey()
  return key
}

const addFinancialsToProperty = async (
  id: string,
  propertyID: string,
  financials: Object
) => {
  db.ref('users')
    .child(`${id}/propertiesOwned/${propertyID}/financials`)
    .update(financials)
}

const addToPropertyFiles = (
  id: string,
  propertyID: string,
  fileType: string,
  fileUrl: string
) => {
  db.ref('users')
    .child(`${id}/propertiesOwned/${propertyID}/files`)
    .update({ [fileType]: fileUrl })
}

const getCostEntries = async (id: string, propertyID: string) => {
  const snapshot = await db
    .ref('users')
    .child(`${id}/propertiesOwned/${propertyID}/financials/costEntries`)
    .once('value')
  return snapshot.val()
}

const userExists = async (id: string) => {
  const snapshot = await db.ref('users').child(id).once('value')
  return snapshot.exists()
}

const getUserValues = async (id: string) => {
  const snapshot = await db.ref('users').child(id).once('value')
  return snapshot.val()
}

export {
  getIdFromToken,
  updateUserValuesDB,
  userExists,
  getUserValues,
  addToPropertiesOwned,
  addToPropertyFiles,
  addFinancialsToProperty,
  getCostEntries
}
