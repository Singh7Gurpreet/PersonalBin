import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,       // Non-null assertion
    secretAccessKey: process.env.AWS_SECRET_KEY!,   // Non-null assertion
  },
});

export default s3Client;
