import { DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import s3Client from "../lib/singletonS3Client.js";
import readyKey from "./hashFunctions.js";
import { getEnumType, TYPE_OF_FILE } from "./TypeOfFileEnums.js";

const deleteItemFromS3 = async (email: string,type:TYPE_OF_FILE) => {
    const key = readyKey(email);
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.BUCKET_NAME,
      Prefix: key,
    });

    const listResponse = await s3Client.send(listCommand);
    const objects = listResponse.Contents || [];
    
    if (objects.length === 0) {
      throw new Error("No file for this user");
    }

    let objectKey = null;
        for(let i = 0; i < objects.length; i++) {
          const object = objects[i].Key!;
          const fileType = object.split("$$")[2];
          if(getEnumType(fileType) === type) {
            objectKey = objects[i];
            break;
          }
        }

    const command = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: objectKey?.Key
    });

    const response = await s3Client.send(command);
    return response;
  } catch (error) {
    console.error("Error deleting object:", error);
    throw error;
  }
};

export default deleteItemFromS3;