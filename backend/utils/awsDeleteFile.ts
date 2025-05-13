import { DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import s3Client from "../lib/singletonS3Client.js";
import config from "../configs/default.js";
import readyKey from "./hashFunctions.js";

const deleteItemFromS3 = async (email: string) => {
    const key = readyKey(email);
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: config.BUCKET_NAME,
      Prefix: key,
    });

    const listResponse = await s3Client.send(listCommand);
    const objects = listResponse.Contents || [];
    
    if (objects.length === 0) {
      throw new Error("No file for this user");
    }

    const objectKey = objects[0].Key!;

    const command = new DeleteObjectCommand({
      Bucket: config.BUCKET_NAME,
      Key: objectKey
    });

    const response = await s3Client.send(command);
    console.log("Deleted successfully:", key);
    return response;
  } catch (error) {
    console.error("Error deleting object:", error);
    throw error;
  }
};

export default deleteItemFromS3;