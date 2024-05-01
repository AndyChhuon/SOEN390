const admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.SERVICE_ACCOUNT_KEYS);
// console.log(serviceAccount);

const serviceAccount = process.env.SERVICE_ACCOUNT_KEYS
  ? JSON.parse(process.env.SERVICE_ACCOUNT_KEYS)
  : null;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://condo-management-41b07-default-rtdb.firebaseio.com",
});

const getIdFromToken = async (idToken: string) => {
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  return decodedToken.uid;
};

const db = admin.database();

const updateUserValuesDB = (id: string, userValues: Object) => {
  db.ref("users").child(id).update(userValues);
};

const addToPropertiesOwned = async (id: string, propertyValues: Object) => {
  const key = db
    .ref("users")
    .child(`${id}/propertiesOwned`)
    .push(propertyValues)
    .getKey();

  db.ref("properties")
    .child(key)
    .update({ id: key, ...propertyValues, owner: id });
  return key;
};

const addToRenting = async (id: string, propertyId: string) => {
  const startDate = new Date().toISOString();
  db.ref("users").child(`${id}/renting/${propertyId}`).update({
    startDate,
  });

  return startDate;
};

const getRentableProperties = async (id: string) => {
  const snapshot = await db.ref("properties").once("value");
  const renting = await db
    .ref("users")
    .child(id)
    .child("renting")
    .once("value");

  const properties = snapshot.val();
  const rentableProperties: Record<string, any> = {};
  for (const property in properties) {
    if (!renting.hasChild(property)) {
      rentableProperties[property] = properties[property];
    }
  }
  return rentableProperties;
};

const addFinancialsToProperty = async (
  id: string,
  propertyID: string,
  financials: Object
) => {
  db.ref("users")
    .child(`${id}/propertiesOwned/${propertyID}/financials`)
    .update(financials);
};

const addToPropertyFiles = (
  id: string,
  propertyID: string,
  fileType: string,
  fileUrl: string
) => {
  db.ref("users")
    .child(`${id}/propertiesOwned/${propertyID}/files`)
    .update({ [fileType]: fileUrl });

  db.ref("properties")
    .child(propertyID)
    .child("files")
    .update({ [fileType]: fileUrl });
};

const getCostEntries = async (id: string, propertyID: string) => {
  const snapshot = await db
    .ref("users")
    .child(`${id}/propertiesOwned/${propertyID}/financials/costEntries`)
    .once("value");
  return snapshot.val();
};

const userExists = async (id: string) => {
  const snapshot = await db.ref("users").child(id).once("value");
  return snapshot.exists();
};

const getRentedProperties = async (id: string) => {
  const renting = await db
    .ref("users")
    .child(id)
    .child("renting")
    .once("value");

  const rentingProperties = renting.val() || {};
  const rentedProperties: Record<string, any> = {};
  const propertyPromises: Array<Promise<void>> = [];

  Object.keys(rentingProperties).forEach((propertyId) => {
    // Push each async operation into the promise array
    propertyPromises.push(
      new Promise(async (resolve) => {
        const property = await db
          .ref("properties")
          .child(propertyId)
          .once("value");
        rentedProperties[propertyId] = property.val();
        resolve();
      })
    );
  });

  await Promise.all(propertyPromises);
  return rentedProperties;
};

const getUserValues = async (id: string) => {
  const snapshot = await db.ref("users").child(id).once("value");
  return snapshot.val();
};

const addToNotifications = async (
  userId: string,
  message: string,
  timestamp: number = Date.now()
) => {
  const notificationsRef = db.ref(`notifications/${userId}`);
  const newNotificationRef = notificationsRef.push();
  await newNotificationRef.set({
    message,
    timestamp,
    read: true,
  });
  return newNotificationRef.key; // Returns the key of the new notification
};

const getNotifications = async (userId: string) => {
  const notificationsRef = db.ref(`notifications/${userId}`);
  const snapshot = await notificationsRef.once("value");
  return snapshot.val();
};

type NotificationUpdate = {
  read: boolean;
};

const updateNotification = async (
  userId: string,
  notificationId: string,
  read: boolean
) => {
  const notificationRef = db.ref(`notifications/${userId}/${notificationId}`);
  const updates: NotificationUpdate = { read };
  updates.read = read;

  await notificationRef.update(updates);
};

const addScheduledActivity = async (
  id: string,
  propertyID: string,
  activity: string,
  date: string,
  timeArr: string
) => {
  for (const time of timeArr) {
    await db
      .ref("users")
      .child(
        `${id}/renting/${propertyID}/scheduledActivities/${activity}/${date}`
      )
      .update({ [time]: true });

    await db
      .ref("properties")
      .child(`${propertyID}/scheduledActivities/${activity}/${date}`)
      .update({ [time]: true });
  }
};

const getPropertyAvailableTimes = async (
  propertyID: string,
  activity: string,
  date: string
) => {
  const snapshot = await db
    .ref("properties")
    .child(`${propertyID}/scheduledActivities/${activity}/${date}`)
    .once("value");

  const takenTimes = snapshot.val() || {};
  const availableTimes: string[] = [];
  for (let i = 8; i < 20; i++) {
    const timeString = i < 10 ? `0${i}:00` : `${i}:00`;
    if (!takenTimes.hasOwnProperty(timeString)) {
      availableTimes.push(timeString);
    }
  }
  return availableTimes;
};

const addToEmployees = async (id: string) => {
  db.ref("employees").child(id).set(true);
};

const getEmployableIds = async (id: string) => {
  const employedSnapshot = await db.ref("employments").child(id).once("value");
  const employedArray = Object.keys(employedSnapshot.val() || {});

  const snapshot = await db.ref("employees").once("value");
  const employeeIdArray = Object.keys(snapshot.val() || {});

  return employeeIdArray.filter(
    (employeeId) => !employedArray.includes(employeeId)
  );
};

const getEmployedUsers = async (id: string) => {
  const snapshot = await db.ref("employments").child(id).once("value");
  const snapshotObject = snapshot.val() || {};
  const employeeObjectArray = Object.values(snapshotObject);
  return employeeObjectArray;
};

const addEmployment = async (id: string, employeeId: string) => {
  // get user info
  const conserveInfo = [
    "firstName",
    "lastName",
    "userEmail",
    "phoneNumber",
    "streetAddress",
  ];
  const userSnapshot = await db.ref("users").child(employeeId).once("value");
  const userValues = userSnapshot.val();
  const conserveValues: Record<string, any> = {};
  for (const key of conserveInfo) {
    conserveValues[key] = userValues[key];
  }
  conserveValues["id"] = employeeId;

  // add to employments
  await db
    .ref("employments")
    .child(id)
    .update({ [employeeId]: conserveValues });

  return conserveValues;
};

const removeEmployment = async (id: string, employeeId: string) => {
  await db.ref("employments").child(id).child(employeeId).remove();
};

export {
  getIdFromToken,
  updateUserValuesDB,
  userExists,
  getUserValues,
  addToPropertiesOwned,
  addToPropertyFiles,
  addFinancialsToProperty,
  getCostEntries,
  addToNotifications,
  getNotifications,
  updateNotification,
  addToRenting,
  getRentableProperties,
  getRentedProperties,
  addScheduledActivity,
  getPropertyAvailableTimes,
  addToEmployees,
  getEmployableIds,
  getEmployedUsers,
  addEmployment,
  removeEmployment,
};
