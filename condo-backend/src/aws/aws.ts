const AWS = require("aws-sdk");
const multiparty = require("multiparty");
const path = require("path");
const fs = require("fs");
const {
  getIdFromToken,
  updateUserValuesDB,
  userExists,
  getUserValues,
} = require("../firebase/firebase");

AWS.config.update({
  region: "us-west-2",
  accessKeyId: "accessKeyId",
  secretAccessKey: "secretAccessKey",
});

const getDataFromRequest = (req: any): any =>
  new Promise(async (resolve, reject) => {
    const form = new multiparty.Form();
    await form.parse(req, async (err: any, fields: any, files: any) => {
      if (err) reject(err);
      if (!fields.tokenId) {
        return reject("tokenId was not found in form data.");
      }
      if (!fields.propertyID) {
        return reject("propertyID was not found in form data.");
      }
      if (!fields.fileType) {
        return reject("fileType was not found in form data.");
      }
      if (!files["file"]) {
        console.log("file was not found in form data.");
        return reject("File was not found in form data.");
      }
      console.log(files["file"]);
      const tokenId = fields.tokenId[0];
      const file = files["file"][0]; // get the file from the returned files object
      const userId = await getIdFromToken(tokenId);
      const propertyID = fields.propertyID[0];
      const fileType = fields.fileType[0];

      if (!file) return reject("File was not found in form data.");
      else
        resolve({
          file,
          userId,
          propertyID,
          fileType,
        });
    });
  });

const uploadFileToS3Bucket = (
  file: any,
  userId: string,
  filePath: string,
  options = {}
): any => {
  const s3 = new AWS.S3();

  // turn the file into a buffer for uploading
  const buffer = fs.readFileSync(file.path);

  var originalname = file.originalFilename;
  var attach_split = originalname.split(".");
  var name = attach_split[0];
  // generate a new random file name
  const fileName = name;

  // the extension of your file
  const extension = path.extname(file.path);

  console.log(`${fileName}${extension}`);

  const params = {
    Bucket: "soen390-files", //Bucketname
    Key: `${userId}/${filePath}/${fileName}${extension}`, // File name you want to save as in S3
    Body: buffer, // Content of file
  };

  // return a promise
  return new Promise((resolve, reject) => {
    return s3.upload(params, (err: any, result: any) => {
      if (err) reject(err);
      else resolve(result); // return the values of the successful AWS S3 request
    });
  });
};

const uploadFileFromRequest = async (req: Request) => {
  const { file, userId, propertyID, fileType } = await getDataFromRequest(req);

  const { Location, ETag, Bucket, Key } = await uploadFileToS3Bucket(
    file,
    propertyID,
    fileType
  );

  return { userId, propertyID, fileType, Location };
};

export { uploadFileFromRequest };
