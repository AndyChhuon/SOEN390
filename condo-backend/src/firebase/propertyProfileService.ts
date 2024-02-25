import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { uploadFileFromRequest } from "../aws/aws";
const {
  getIdFromToken,
  updateUserValuesDB,
  userExists,
  addToPropertiesOwned,
  getUserValues,
  addToPropertyFiles,
} = require("./firebase");

const propertyProfileAllowedKeys = [
  "propertyName",
  "unitCount",
  "parkingCount",
  "lockerCount",
  "Address",
];

const propertyProfileKeysAreValid = (userValues: Object) => {
  const keys = Object.keys(userValues);
  return keys.every((key) => propertyProfileAllowedKeys.includes(key));
};

const addPropertiesOwned = async (
  tokenId: String,
  propertyValues: Object,
  response: Response
) => {
  const id = await getIdFromToken(tokenId);
  if (!propertyProfileKeysAreValid(propertyValues)) {
    response.status(400).send("Invalid property values");
  } else if (await userExists(id)) {
    // user exists and propertyValues are valid, update propertyValues
    const key = await addToPropertiesOwned(id, propertyValues);
    response.status(200).send({
      message: "property values updated successfully",
      newPropertyOwned: { [key]: propertyValues },
    });
  } else {
    response.status(404).send("User not found");
  }
};

const addPropertyFile = async (req: Request, response: Response) => {
  // user exists and propertyValues are valid, update propertyValues
  const { userId, propertyID, fileType, Location } =
    await uploadFileFromRequest(req);
  addToPropertyFiles(userId, propertyID, fileType, Location);
  response.status(200).send({
    message: "file uploaded successfully",
    newFileUploaded: { [fileType]: Location },
  });
};

export { addPropertiesOwned, addPropertyFile };
