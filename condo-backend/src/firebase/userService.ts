import { type Response } from "express";

const {
  getIdFromToken,
  updateUserValuesDB,
  userExists,
  getUserValues,
} = require("./firebase");

const userValuesAllowedKeys = [
  "city",
  "firstName",
  "lastName",
  "phoneNumber",
  "postalcode",
  "stateProvince",
  "streetAddress",
  "userEmail",
  "profileUrl",
  "propertiesOwned",
  "renting",
  "userType",
];

const defaultUserValues = {
  city: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  postalcode: "",
  stateProvince: "",
  streetAddress: "",
  userEmail: "",
  profileUrl: "",
  userType: "renter",

};

const userValueKeysAreValid = (userValues: Object) => {
  const keys = Object.keys(userValues);
  return keys.every((key) => userValuesAllowedKeys.includes(key));
};

const updateUserValues = async (
  tokenId: string,
  userValues: Object,
  response: Response
) => {
  const id = await getIdFromToken(tokenId);
  if (!userValueKeysAreValid(userValues)) {
    response.status(400).send("Invalid user values");
  } else if (await userExists(id)) {
    // user exists and userValues are valid, update userValues
    updateUserValuesDB(id, userValues);
    response.status(200).send({
      message: "User values updated successfully",
      userValues,
    });
  } else {
    response.status(404).send("User not found");
  }
};

const initializeUser = async (
  tokenId: string,
  email: string,
  response: Response
) => {
  const id = await getIdFromToken(tokenId);
  if (await userExists(id)) {
    response.status(200).send({
      message: "User logged in successfully",
      userValues: await getUserValues(id),
    });
  } else {
    const userValues = {
      ...defaultUserValues,
      userEmail: email,
    };
    updateUserValuesDB(id, userValues);
    response.status(200).send({
      message: "User signed up successfully",
      userValues,
    });
  }
};

export { updateUserValues, initializeUser };
