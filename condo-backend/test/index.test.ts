import { describe, expect, test } from "@jest/globals";

const { app } = require("../src/app");
const superTest = require("supertest");
const admin = require("firebase-admin");
const request = superTest(app);
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({
  path: "__tests__/.env",
});

const data = JSON.stringify({
  email: "test@gmail.com",
  password: "test1234",
  returnSecureToken: true,
});
const config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDnHXfchED8ogSHvzR1tKq7kPaK7faJEI",
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
};
const userValues = {
  city: "test",
  firstName: "test",
  lastName: "test",
  phoneNumber: "test",
  postalcode: "test",
  stateProvince: "test",
  streetAddress: "test",
  userEmail: "test",
  profileUrl: "test",
};

describe("Test updateUserValues with no tokenId", () => {
  test("It should return an invalid request", async () => {
    const response = await request.post("/updateUserValues");
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("Invalid request");
  });
});

describe("Test initializeUser with no tokenId", () => {
  test("It should return an invalid request", async () => {
    const response = await request.post("/initializeUser");
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("Invalid request");
  });
});

describe("Test addPropertyFile with no tokenId", () => {
  test("It should return an Internal server error", async () => {
    const response = await request.post("/addPropertyFile");
    expect(response.statusCode).toBe(500);
    expect(response.text).toBe("Internal server error");
  });
});

describe("Test addProperty with no tokenId", () => {
  test("It should return an invalid request", async () => {
    const response = await request.post("/addProperty");
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("Invalid request");
  });
});

describe("Test updateUserValues with incorrect userValues", () => {
  test("It should return an invalid request", async () => {
    const response = await request.post("/updateUserValues").send({
      tokenId: "test",
      userValues: "test",
    });
    expect(response.statusCode).toBe(500);
    expect(response.text).toBe("Internal server error");
  });
});

describe("Test updateUserValues with tokenId and userValues", () => {
  test("It should return ok ", async () => {
    const signInBody = await axios
      .request(config)
      .then((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        console.log(error);
      });
    const response = await request.post("/updateUserValues").send({
      tokenId: signInBody.idToken,
      userValues: userValues,
    });
    expect(response.statusCode).toBe(200);
    const responseJson = JSON.parse(response.text);
    expect(responseJson.message).toBe("User values updated successfully");
    expect(responseJson.userValues).toMatchObject(userValues);
  });
});

describe("Test initializeUser with tokenId and email", () => {
  test("It should return ok ", async () => {
    const signInBody = await axios
      .request(config)
      .then((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        console.log(error);
      });
    const response = await request.post("/initializeUser").send({
      tokenId: signInBody.idToken,
      email: "test@gmail.com",
    });
    expect(response.statusCode).toBe(200);
    const responseJson = JSON.parse(response.text);
    expect(responseJson.message).toBe("User logged in successfully");
    expect(responseJson.userValues).toMatchObject(userValues);
  });
});

describe("Test addProperty with tokenId and propertyValues", () => {
  test("It should return ok ", async () => {
    const propertyValues = {
      propertyName: "test",
      unitCount: "test",
      parkingCount: "test",
      lockerCount: "test",
      Address: "test",
    };
    const signInBody = await axios
      .request(config)
      .then((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        console.log(error);
      });
    const response = await request.post("/addProperty").send({
      tokenId: signInBody.idToken,
      propertyValues: propertyValues,
    });
    expect(response.statusCode).toBe(200);
    const responseJson = JSON.parse(response.text);
    expect(responseJson.message).toBe("property values updated successfully");

    const returnedPropertyValues =
      responseJson.newPropertyOwned[
        Object.keys(responseJson.newPropertyOwned)[0]
      ];
    expect(returnedPropertyValues).toMatchObject(propertyValues);
  });
});
