//Node .
// Runs on http://localhost:8080

const express = require("express");
const app = express();
const { updateUserValues, initializeUser } = require("./firebase/userService");
const { parseJSONOrString } = require("./utils/utils");
import { NextFunction, Request, Response } from "express";

// Custom error handling middleware
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
};

app.use((req: Request, res: Response, next: NextFunction) => {
  throw new Error("Something went wrong!");
});

// Use the custom error handling middleware
app.use(errorHandler);

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
