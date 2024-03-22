import { type Response } from 'express'
import { uploadFileFromRequest } from '../aws/aws'
const {
  getIdFromToken,
  userExists,
  addToPropertiesOwned,
  addToPropertyFiles
} = require('./firebase')

const propertyProfileAllowedKeys = [
  'Address',
  'condoFee',
  'electricIncluded',
  'parkingCount',
  'petsAllowed',
  'propertyName',
  'rentAmount',
  'securityDeposit',
  'smokingAllowed',
  'waterIncluded',
];

const propertyProfileKeysAreValid = (userValues: Object) => {
  const keys = Object.keys(userValues)
  return keys.every((key) => propertyProfileAllowedKeys.includes(key))
}

const addPropertiesOwned = async (
  tokenId: string,
  propertyValues: Object,
  response: Response
) => {
  const id = await getIdFromToken(tokenId)
  if (!propertyProfileKeysAreValid(propertyValues)) {
    response.status(400).send('Invalid property values')
  } else if (await userExists(id)) {
    // user exists and propertyValues are valid, update propertyValues
    const key = await addToPropertiesOwned(id, propertyValues)
    response.status(200).send({
      message: 'property values updated successfully',
      newPropertyOwned: { [key]: propertyValues }
    })
  } else {
    response.status(404).send('User not found')
  }
}

const addPropertyFile = async (req: Request, response: Response) => {
  // user exists and propertyValues are valid, update propertyValues
  const { userId, propertyID, fileType, Location } =
    await uploadFileFromRequest(req)
  addToPropertyFiles(userId, propertyID, fileType, Location)
  response.status(200).send({
    message: 'file uploaded successfully',
    newFileUploaded: { [fileType]: Location }
  })
}

export { addPropertiesOwned, addPropertyFile }
