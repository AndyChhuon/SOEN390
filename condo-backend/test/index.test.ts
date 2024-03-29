import { describe, expect, test, beforeAll } from '@jest/globals'

const { app } = require('../src/app')
const superTest = require('supertest')
const request = superTest(app)
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config({
  path: '__tests__/.env'
})

let tokenId = ''

const userValues = {
  city: 'test',
  firstName: 'test',
  lastName: 'test',
  phoneNumber: 'test',
  postalcode: 'test',
  stateProvince: 'test',
  streetAddress: 'test',
  userEmail: 'test',
  profileUrl: 'test'
}

const data = JSON.stringify({
  email: 'test@gmail.com',
  password: 'test1234',
  returnSecureToken: true
})
const config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDnHXfchED8ogSHvzR1tKq7kPaK7faJEI',
  headers: {
    'Content-Type': 'application/json'
  },
  data
}

beforeAll(async () => {
  try {
    const signInBody = await axios
      .request(config)
      .then((response: any) => {
        return response.data
      })
      .catch((error: any) => {
        console.log(error)
      })
    console.log('Response:', signInBody)

    tokenId = signInBody.idToken

    // Optionally, you can log the tokenId for verification
    console.log('Retrieved Token ID:', tokenId)
  } catch (error) {
    console.error('Error occurred during sign-in:', error)
  }
})

describe('Test updateUserValues with no tokenId', () => {
  test('It should return an invalid request', async () => {
    const response = await request.post('/updateUserValues')
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('Invalid request')
  })
})

describe('Test initializeUser with no tokenId', () => {
  test('It should return an invalid request', async () => {
    const response = await request.post('/initializeUser')
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('Invalid request')
  })
})

describe('Test addPropertyFile with no tokenId', () => {
  test('It should return an Internal server error', async () => {
    const response = await request.post('/addPropertyFile')
    expect(response.statusCode).toBe(500)
    expect(response.text).toBe('Internal server error')
  })
})

describe('Test addProperty with no tokenId', () => {
  test('It should return an invalid request', async () => {
    const response = await request.post('/addProperty')
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('Invalid request')
  })
})

describe('Test updateUserValues with incorrect userValues', () => {
  test('It should return an invalid request', async () => {
    const response = await request.post('/updateUserValues').send({
      tokenId: 'test',
      userValues: 'test'
    })
    expect(response.statusCode).toBe(500)
    expect(response.text).toBe('Internal server error')
  })
})

describe('Test updateUserValues with tokenId and userValues', () => {
  test('It should return ok ', async () => {
    const response = await request.post('/updateUserValues').send({
      tokenId,
      userValues
    })
    expect(response.statusCode).toBe(200)
    const responseJson = JSON.parse(response.text)
    expect(responseJson.message).toBe('User values updated successfully')
    expect(responseJson.userValues).toMatchObject(userValues)
  })
})

describe('Test initializeUser with tokenId and email', () => {
  test('It should return ok ', async () => {
    const response = await request.post('/initializeUser').send({
      tokenId,
      email: 'test@gmail.com'
    })
    expect(response.statusCode).toBe(200)
    const responseJson = JSON.parse(response.text)
    expect(responseJson.message).toBe('User logged in successfully')
    expect(responseJson.userValues).toMatchObject(userValues)
  })
})

describe('Test addProperty with tokenId and propertyValues', () => {
  test('It should return ok ', async () => {
    const propertyValues = {
      propertyName: 'test',
      unitCount: 'test',
      parkingCount: 'test',
      lockerCount: 'test',
      Address: 'test'
    }

    console.log('tokenIdTest', tokenId)

    const response = await request.post('/addProperty').send({
      tokenId,
      propertyValues
    })
    expect(response.statusCode).toBe(200)
    const responseJson = JSON.parse(response.text)
    expect(responseJson.message).toBe('property values updated successfully')

    const returnedPropertyValues =
      responseJson.newPropertyOwned[
        Object.keys(responseJson.newPropertyOwned)[0]
      ]
    expect(returnedPropertyValues).toMatchObject(propertyValues)
  })
})

describe('Test generateReport with no tokenId', () => {
  test('It should return an invalid request', async () => {
    const response = await request.post('/generateReport')
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('Invalid request')
  })
})

describe('Test generateReport with correct values', () => {
  test('It should return an invalid request', async () => {
    const response = await request.post('/generateReport').send({
      tokenId,
      propertyId: '-NrXkOywWaianDVU_NiM'
    })
    expect(response.statusCode).toBe(200)
  })
})

describe('Test updatePropertyFinancials with no body', () => {
  test('It should return an invalid request', async () => {
    const response = await request.post('/updatePropertyFinancials')
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('Invalid request')
  })
})

describe('Test updatePropertyFinancials with correct values', () => {
  test('It should return an invalid request', async () => {
    const response = await request.post('/updatePropertyFinancials').send({
      tokenId,
      propertyId: '-NrXkOywWaianDVU_NiM',
      propertyFinancials: {
        feePerSquareFoot: 1,
        feePerParkingSpot: 2,
        costEntries: [
          {
            id: 'test',
            description: 'test',
            amount: 1
          },
          {
            id: 'test2',
            description: 'test2',
            amount: 2
          }
        ],
        annualReport: 'test'
      }
    })
    expect(response.statusCode).toBe(200)
    const responseJson = JSON.parse(response.text)

    expect(responseJson.message).toBe(
      'property financials updated successfully'
    )
  })
})

describe('Test generateResponse with no tokenId', () => {
  test('It should return an invalid request', async () => {
    const response = await request.post('/generateResponse')
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('Invalid request')
  })
})

describe('Test generateResponse with correct values', () => {
  test('It should return an invalid request', async () => {
    const response = await request.post('/generateResponse').send({
      tokenId,
      messagesArr: [
        {
          role: 'user',
          content: 'hello'
        }
      ]
    })
    expect(response.statusCode).toBe(200)
  })
})
