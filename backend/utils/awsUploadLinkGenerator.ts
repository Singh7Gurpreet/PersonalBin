import s3Client from "../lib/singletonS3Client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import readyKey from "./hashFunctions.js";
import { TYPE_OF_FILE } from "./TypeOfFileEnums.js";

async function linkGenerator(email:string, name: string, type:TYPE_OF_FILE) : Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: `${readyKey(email)}$$${name}$$${type}`,
  });
  
  return await getSignedUrl(s3Client, command, { expiresIn: 900 });
}

export default linkGenerator;