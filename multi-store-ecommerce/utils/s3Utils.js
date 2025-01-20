const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadToS3 = (file) => {
  const fileContent = fs.readFileSync(file.path);
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${Date.now()}_${path.basename(file.originalname)}`,
    Body: fileContent,
    ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
};

const deleteFromS3 = (fileUrl) => {
  const fileName = fileUrl.split('/').pop();
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
  };

  return s3.deleteObject(params).promise();
};

module.exports = {
  uploadToS3,
  deleteFromS3,
};
