import {
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../lib/singletonS3Client.js";
import config from "../configs/default.js";
import readyKey from "./hashFunctions.js";

const generateDownloadLink = async (email: string) => {
  const key = readyKey(email);
  try {
    // Step 1: List all objects with the given prefix
    const listCommand = new ListObjectsV2Command({
      Bucket: config.BUCKET_NAME,
      Prefix: key, // e.g., "key-"
    });

    const listResponse = await s3Client.send(listCommand);
    const objects = listResponse.Contents || [];

    // Step 2: If no files found, throw error
    if (objects.length === 0) {
      throw new Error("No file for this user");
    }

    // Step 3: Use the first matched key
    const objectKey = objects[0].Key!;

    // Extract filename from the key (everything after "key-")
    const filename = objectKey.split("$$")[1];

    // Step 4: Generate signed URL
    const command = new GetObjectCommand({
      Bucket: config.BUCKET_NAME,
      Key: objectKey,
      ResponseContentDisposition: `attachment; filename="${filename}"`,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });
    return signedUrl;
  } catch (error: any) {
    if(error.message !== "No file for this user") {
      console.error("Error generating download link:", error);
    }
    throw error;
  }
};

export default generateDownloadLink;
