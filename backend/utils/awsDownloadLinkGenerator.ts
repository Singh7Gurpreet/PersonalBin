import { HeadObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../lib/singletonS3Client.js"; // adjust your path
import config from "../configs/default.js";

const generateDownloadLink = async (key: string) => {
  try {
    // Check if the object exists
    await s3Client.send(new HeadObjectCommand({
      Bucket: config.BUCKET_NAME,
      Key: key,
    }));

    // If it exists, generate signed URL
    const command = new GetObjectCommand({
      Bucket: config.BUCKET_NAME,
      Key: key,
      ResponseContentDisposition: 'attachment; filename="file.txt"'
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 600 });
    return signedUrl;
  } catch (error: any) {
    if (error.name === "NotFound" || error.$metadata?.httpStatusCode === 404) {
      throw error;
    }
    console.error("Unexpected error:", error);
    throw error;
  }
};



export default generateDownloadLink;