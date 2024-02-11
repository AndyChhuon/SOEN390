import { describe, expect, test } from "@jest/globals";

const { app } = require("../src/app");
const superTest = require("supertest");
const request = superTest(app);

const dotenv = require("dotenv");
dotenv.config({
  path: "__tests__/.env",
});

describe("Test updateUserValues with no tokenId", () => {
  test("It should return an invalid request", async () => {
    const response = await request.post("/updateUserValues");
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("Invalid request");
  });
});
