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
    try {
      console.log("Calling updateUserValues endpoint");
      const userValues = parseJSONOrString(req.body.userValues);
      updateUserValues(req.body.tokenId, userValues, res);
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  } else {
    res.status(400).send("Invalid request");
  }
});

app.post("/initializeUser", (req: Request, res: Response) => {
  if (req.body.tokenId && req.body.email) {
    try {
      console.log("Calling initializeUser endpoint");
      initializeUser(req.body.tokenId, req.body.email, res);
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  } else {
    res.status(400).send("Invalid request");
  }
});

export { app };
