import {
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../lib/singletonS3Client.js";
import readyKey from "./hashFunctions.js";
import { getEnumType, TYPE_OF_FILE } from "./TypeOfFileEnums.js";

const generateDownloadLink = async (email: string, type: TYPE_OF_FILE) => {
  const key = readyKey(email);
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.BUCKET_NAME,
      Prefix: key,
    });

    const listResponse = await s3Client.send(listCommand);
    const objects = listResponse.Contents || [];
    // Step 2: If no files found, throw error
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

    if(objectKey === null) {
      throw new Error("No file for this user");
    }

    const filename = objectKey.Key!.split("$$")[1];
    let timeStamp = objects[0].LastModified?.getTime();
    
    // Step 4: Generate signed URL
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: objectKey.Key,
      ResponseContentDisposition: `attachment; filename="${filename}"`,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });
    return {
      signedUrl:signedUrl,
      timeStamp:timeStamp,
      filename:filename
    };
  } catch (error: any) {
    if(error.message !== "No file for this user") {
      console.error("Error generating download link:", error);
    }
    throw error;
  }
};

export default generateDownloadLink;