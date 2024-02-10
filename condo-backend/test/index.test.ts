const { app } = require("../src/index");
const superTest = require("supertest");
const request = superTest(app);
import { describe, expect, test } from "@jest/globals";

describe("Test updateUserValues with no tokenId", () => {
  test("It should return an invalid request", async () => {
    const response = await request.post("/updateUserValues");
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("Invalid request");
  });
});
