//Node .
// Runs on http://localhost:8080

const express = require("express");
const cors = require("cors");
const app = express();
const { updateUserValues, initializeUser } = require("./firebase/userService");
const {
  addPropertiesOwned,
  addPropertyFile,
} = require("./firebase/propertyProfileService");
const { parseJSONOrString } = require("./utils/utils");
import { Request, Response } from "express";

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Test Success");
});


app.post("/updateUserValues", async (req: Request, res: Response) => {
  if (req.body.tokenId && req.body.userValues) {
    try {
      console.log("Calling updateUserValues endpoint");
      const userValues = parseJSONOrString(req.body.userValues);
      await updateUserValues(req.body.tokenId, userValues, res);
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  } else {
    res.status(400).send("Invalid request");
  }
});

app.post("/initializeUser", async (req: Request, res: Response) => {
  if (req.body.tokenId && req.body.email) {
    try {
      console.log("Calling initializeUser endpoint");
      await initializeUser(req.body.tokenId, req.body.email, res);
    } catch (e) {
      console.log(e);
      res.status(500).send("Internal server error");
    }
  } else {
    res.status(400).send("Invalid request");
  }
});

app.post("/addPropertyFile", async (req: Request, res: Response) => {
  try {
    console.log("Calling addPropertyFile endpoint");
    const response = await addPropertyFile(req, res);
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});

app.post("/addProperty", async (req: Request, res: Response) => {
  try {
    console.log("Calling addProperty endpoint");
    await addPropertiesOwned(req.body.tokenId, req.body.propertyValues, res);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error");
  }
});

export { app };
