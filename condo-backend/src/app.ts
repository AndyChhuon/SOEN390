// Node .
// Runs on http://localhost:8080

import { type Request, type Response } from 'express'
const express = require('express')
const cors = require('cors')
const app = express()
const { updateUserValues, initializeUser } = require('./firebase/userService')
const {
  addPropertiesOwned,
  addPropertyFile
} = require('./firebase/propertyProfileService')
const {
  addPropertyFinancials,
  generateReport
} = require('./firebase/financialService')
const {
  addUserRenter,
  getUserRentableProperties,
  getUserRentedProperties,
  addUserScheduledActivity,
  getUserPropertyAvailableTimes
} = require('./firebase/rentingService')
const { generateResponse } = require('./openai/chat')
const { parseJSONOrString } = require('./utils/utils')

app.use(express.json())
app.use(cors())

app.post('/updateUserValues', async (req: Request, res: Response) => {
  if (req.body.tokenId && req.body.userValues) {
    try {
      console.log('Calling updateUserValues endpoint')
      const userValues = parseJSONOrString(req.body.userValues)
      await updateUserValues(req.body.tokenId, userValues, res)
    } catch (e) {
      console.log(e)
      res.status(500).send('Internal server error')
    }
  } else {
    res.status(400).send('Invalid request')
  }
})

app.post('/updatePropertyFinancials', async (req: Request, res: Response) => {
  if (req.body.tokenId && req.body.propertyId && req.body.propertyFinancials) {
    try {
      console.log('Calling updateUserValues endpoint')
      const propertyFinancials = parseJSONOrString(req.body.propertyFinancials)
      await addPropertyFinancials(
        req.body.tokenId,
        req.body.propertyId,
        propertyFinancials,
        res
      )
    } catch (e) {
      console.log(e)
      res.status(500).send('Internal server error')
    }
  } else {
    res.status(400).send('Invalid request')
  }
})

app.post('/generateReport', async (req: Request, res: Response) => {
  if (req.body.tokenId && req.body.propertyId) {
    console.log('Calling generateReport endpoint')
    await generateReport(req.body.tokenId, req.body.propertyId, res)
  } else {
    res.status(400).send('Invalid request')
  }
})

app.post('/generateResponse', async (req: Request, res: Response) => {
  if (req.body.tokenId && req.body.messagesArr) {
    try {
      console.log('Calling generateResponse endpoint')
      await generateResponse(req.body.tokenId, req.body.messagesArr, res)
    } catch (e) {
      console.log(e)
      res.status(500).send('Internal server error')
    }
  } else {
    res.status(400).send('Invalid request')
  }
})

app.post('/initializeUser', async (req: Request, res: Response) => {
  if (req.body.tokenId && req.body.email) {
    try {
      console.log('Calling initializeUser endpoint')
      await initializeUser(req.body.tokenId, req.body.email, res)
    } catch (e) {
      console.log(e)
      res.status(500).send('Internal server error')
    }
  } else {
    res.status(400).send('Invalid request')
  }
})

app.post('/addPropertyFile', async (req: Request, res: Response) => {
  try {
    console.log('Calling addPropertyFile endpoint')
    const response = await addPropertyFile(req, res)
    res.status(200).send(response)
  } catch (e) {
    console.log(e)
    res.status(500).send('Internal server error')
  }
})

app.post('/addProperty', async (req: Request, res: Response) => {
  if (req.body.tokenId && req.body.propertyValues) {
    try {
      console.log('Calling addProperty endpoint')
      await addPropertiesOwned(req.body.tokenId, req.body.propertyValues, res)
    } catch (e) {
      console.log(e)
      res.status(500).send('Internal server error')
    }
  } else {
    res.status(400).send('Invalid request')
  }
})

app.post('/addRenter', async (req: Request, res: Response) => {
  if (req.body.tokenId && req.body.propertyId) {
    try {
      console.log('Calling addRenter endpoint')
      await addUserRenter(req.body.tokenId, req.body.propertyId, res)
    } catch (e) {
      console.log(e)
      res.status(500).send('Internal server error')
    }
  } else {
    res.status(400).send('Invalid request')
  }
})

app.post('/getRentableProperties', async (req: Request, res: Response) => {
  if (req.body.tokenId) {
    try {
      console.log('Calling getRentableProperties endpoint')
      await getUserRentableProperties(req.body.tokenId, res)
    } catch (e) {
      console.log(e)
      res.status(500).send('Internal server error')
    }
  } else {
    res.status(400).send('Invalid request')
  }
})

app.post('/getRentedProperties', async (req: Request, res: Response) => {
  if (req.body.tokenId) {
    try {
      console.log('Calling getRentedProperties endpoint')
      await getUserRentedProperties(req.body.tokenId, res)
    } catch (e) {
      console.log(e)
      res.status(500).send('Internal server error')
    }
  } else {
    res.status(400).send('Invalid request')
  }
})

app.post('/addScheduledActivity', async (req: Request, res: Response) => {
  if (
    req.body.tokenId &&
    req.body.propertyId &&
    req.body.activity &&
    req.body.date &&
    req.body.timeArr
  ) {
    try {
      console.log('Calling addScheduledActivity endpoint')
      await addUserScheduledActivity(
        req.body.tokenId,
        req.body.propertyId,
        req.body.activity,
        req.body.date,
        req.body.timeArr,
        res
      )
    } catch (e) {
      console.log(e)
      res.status(500).send('Internal server error')
    }
  } else {
    res.status(400).send('Invalid request')
  }
})

app.post('/getPropertyAvailableTimes', async (req: Request, res: Response) => {
  if (
    req.body.tokenId &&
    req.body.propertyId &&
    req.body.activity &&
    req.body.date
  ) {
    try {
      console.log('Calling getPropertyAvailableTimes endpoint')
      await getUserPropertyAvailableTimes(
        req.body.tokenId,
        req.body.propertyId,
        req.body.activity,
        req.body.date,
        res
      )
    } catch (e) {
      console.log(e)
      res.status(500).send('Internal server error')
    }
  } else {
    res.status(400).send('Invalid request')
  }
})

export { app }
