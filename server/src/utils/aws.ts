import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();
const s3client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const generateUploadURL = async (file: any) => {
  const date = new Date();
  const imageName = `${uuidv4()}-${date.getTime()}.jpeg`;
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
    Body: file.buffer,
  };
  await s3client.send(new PutObjectCommand(param));

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${param.Key}`;
};
