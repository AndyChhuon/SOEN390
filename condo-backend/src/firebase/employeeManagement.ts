import { type Response } from "express";
const {
  getEmployableIds,
  getIdFromToken,
  userExists,
  getEmployedUsers,
  addEmployment,
  removeEmployment,
} = require("./firebase");

const obtainEmployeeIds = async (tokenId: string, response: Response) => {
  const id = await getIdFromToken(tokenId);
  if (await userExists(id)) {
    const employeeIds = await getEmployableIds(id);
    response.status(200).send(employeeIds);
  } else {
    response.status(404).send("User not found");
  }
};

const obtainEmployedUsers = async (tokenId: string, response: Response) => {
  const id = await getIdFromToken(tokenId);
  if (await userExists(id)) {
    const employeeObjectArray = await getEmployedUsers(id);
    response.status(200).send(employeeObjectArray);
  } else {
    response.status(404).send("User not found");
  }
};

const addNewEmployment = async (
  tokenId: string,
  employeeId: string,
  response: Response
) => {
  const id = await getIdFromToken(tokenId);
  if (await userExists(id)) {
    const newEmployeeValues = await addEmployment(id, employeeId);
    response.status(200).send(newEmployeeValues);
  } else {
    response.status(404).send("User not found");
  }
};

const removeEmployee = async (
  tokenId: string,
  employeeId: string,
  response: Response
) => {
  const id = await getIdFromToken(tokenId);
  if (await userExists(id)) {
    await removeEmployment(id, employeeId);
    response.status(200).send("Employee removed");
  } else {
    response.status(404).send("User not found");
  }
};

export {
  obtainEmployeeIds,
  obtainEmployedUsers,
  addNewEmployment,
  removeEmployee,
};
