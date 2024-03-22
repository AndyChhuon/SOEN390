const AWS = require('aws-sdk')
const multiparty = require('multiparty')
const path = require('path')
const fs = require('fs')
const { getIdFromToken } = require('../firebase/firebase')

AWS.config.update({
  region: 'us-west-2'
})

const getDataFromRequest = (req: any): any =>
  new Promise(async (resolve, reject) => {
    const form = new multiparty.Form()
    await form.parse(req, async (err: any, fields: any, files: any) => {
      if (err) reject(err)
      if (!fields) {
        reject('No fields found in form data.')
        return
      }
      if (!fields.tokenId) {
        reject('tokenId was not found in form data.')
        return
      }
      if (!fields.propertyID) {
        reject('propertyID was not found in form data.')
        return
      }
      if (!fields.fileType) {
        reject('fileType was not found in form data.')
        return
      }
      if (!files.file) {
        console.log('file was not found in form data.')
        reject('File was not found in form data.')
        return
      }
      const tokenId = fields.tokenId[0]
      const file = files.file[0] // get the file from the returned files object
      const userId = await getIdFromToken(tokenId)
      const propertyID = fields.propertyID[0]
      const fileType = fields.fileType[0]

      if (!file) {
        reject('File was not found in form data.')
      } else {
        resolve({
          file,
          userId,
          propertyID,
          fileType
        })
      }
    })
  })

const uploadFileToS3Bucket = (
  file: any,
  userId: string,
  filePath: string,
  options = {}
): any => {
  const s3 = new AWS.S3()

  // turn the file into a buffer for uploading
  const buffer = fs.readFileSync(file.path)

  const originalname = file.originalFilename
  const attachSplit = originalname.split('.')
  const name = attachSplit[0]
  // generate a new random file name
  const fileName = name

  // the extension of your file
  const extension = path.extname(file.path)

  console.log(`${fileName}${extension}`)

  const params = {
    Bucket: 'soen390-files', // Bucketname
    Key: `${userId}/${filePath}/${fileName}${extension}`, // File name you want to save as in S3
    Body: buffer // Content of file
  }

  // return a promise
  return new Promise((resolve, reject) => {
    return s3.upload(params, (err: any, result: any) => {
      if (err) reject(err)
      else resolve(result) // return the values of the successful AWS S3 request
    })
  })
}

const uploadFileFromRequest = async (req: Request) => {
  const { file, userId, propertyID, fileType } = await getDataFromRequest(req)

  const { Location } = await uploadFileToS3Bucket(file, propertyID, fileType)

  return { userId, propertyID, fileType, Location }
}

export { uploadFileFromRequest }
