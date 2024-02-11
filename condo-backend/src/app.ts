//Node .
// Runs on http://localhost:8080

const express = require("express");
const app = express();
const { updateUserValues, initializeUser } = require("./firebase/userService");
const { parseJSONOrString } = require("./utils/utils");
import { Request, Response } from "express";

app.use(express.json());

app.post("/updateUserValues", (req: Request, res: Response) => {
  if (req.body.tokenId && req.body.userValues) {
    const userValues = parseJSONOrString(req.body.userValues);
    updateUserValues(req.body.tokenId, userValues, res);
  } else {
    res.status(400).send("Invalid request");
  }
});

app.post("/initializeUser", (req: Request, res: Response) => {
  if (req.body.tokenId && req.body.email) {
    console.log("initializeUserTest");
    initializeUser(req.body.tokenId, req.body.email, res);
  } else {
    res.status(400).send("Invalid request");
  }
});

export { app };
