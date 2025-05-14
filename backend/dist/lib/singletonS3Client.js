import { S3Client } from "@aws-sdk/client-s3";
import config from "../configs/default.js";
const s3Client = new S3Client({
    region: process.env.AWS_REGION || "us-east-2",
    credentials: {
        accessKeyId: config.AWS_ACCESS_KEY,
        secretAccessKey: config.AWS_SECRET_KEY,
    },
});
export default s3Client;
