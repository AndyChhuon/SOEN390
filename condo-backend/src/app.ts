// Node .
// Runs on http://localhost:8080

import { type Request, type Response } from 'express'
import { addToNotifications, getNotifications, updateNotification } from './firebase/firebase'
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
const { generateResponse } = require('./openai/chat')
const { parseJSONOrString } = require('./utils/utils')
//const { addNotification } = require('./firebase/notificationService')

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

app.post('/addNotification', async (req: Request, res: Response) => {
  const { userId, message, timestamp } = req.body;
  await addToNotifications(userId, message, timestamp || Date.now());
});

app.get('/getNotifications', async (req: Request, res: Response) => {
  const userId = req.query.userId; // Change from req.body to req.query
  if (!userId) {
    return res.status(400).send('User ID is required');
  }
  
  try {
    const notifications = await getNotifications(userId.toString());
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).send('Failed to retrieve notifications');
  }
});




app.post('/updateNotification', async (req: Request, res: Response) => {
  const { userId, notificationId, read } = req.body;
  try {
    await updateNotification(userId, notificationId, read);
    res.status(200).send({ message: 'Notification updated successfully' });
  } catch (error) {
    console.error('Failed to update notification:', error);
    res.status(500).send({ error: 'Failed to update notification' });
  }
});





export { app }
