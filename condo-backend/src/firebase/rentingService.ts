import { type Response } from "express";
const {
  getIdFromToken,
  userExists,
  addToRenting,
  getRentableProperties,
  getRentedProperties,
  addScheduledActivity,
  getPropertyAvailableTimes,
} = require("./firebase");

const addUserRenter = async (
  tokenId: string,
  propertyId: string,
  response: Response
) => {
  const id = await getIdFromToken(tokenId);
  if (await userExists(id)) {
    // user exists and propertyValues are valid, update propertyValues
    const startDate = await addToRenting(id, propertyId);
    response.status(200).send({
      message: "renter added successfully",
      newPropertyRented: {
        [propertyId]: {
          startDate: startDate,
        },
      },
    });
  } else {
    response.status(404).send("User not found");
  }
};

const getUserRentableProperties = async (
  tokenId: string,
  response: Response
) => {
  const id = await getIdFromToken(tokenId);
  if (await userExists(id)) {
    const rentableProperties = await getRentableProperties(id);
    response.status(200).send(rentableProperties);
  } else {
    response.status(404).send("User not found");
  }
};

const getUserRentedProperties = async (tokenId: string, response: Response) => {
  const id = await getIdFromToken(tokenId);
  if (await userExists(id)) {
    const rentedProperties = await getRentedProperties(id);
    response.status(200).send(rentedProperties);
  } else {
    response.status(404).send("User not found");
  }
};

const addUserScheduledActivity = async (
  tokenId: string,
  propertyId: string,
  activity: string,
  date: string,
  timeArr: string,
  response: Response
) => {
  const id = await getIdFromToken(tokenId);
  if (await userExists(id)) {
    await addScheduledActivity(id, propertyId, activity, date, timeArr);
    response.status(200).send({
      message: "Scheduled activity added successfully",
    });
  } else {
    response.status(404).send("User not found");
  }
};

const getUserPropertyAvailableTimes = async (
  tokenId: string,
  propertyId: string,
  activity: string,
  date: string,
  response: Response
) => {
  const id = await getIdFromToken(tokenId);
  if (await userExists(id)) {
    const availableTimes = await getPropertyAvailableTimes(
      propertyId,
      activity,
      date
    );
    response.status(200).send(availableTimes);
  } else {
    response.status(404).send("User not found");
  }
};

export {
  addUserRenter,
  getUserRentableProperties,
  getUserRentedProperties,
  addUserScheduledActivity,
  getUserPropertyAvailableTimes,
};
