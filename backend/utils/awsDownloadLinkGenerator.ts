import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../lib/singletonS3Client.js"; // adjust your path
import config from "../configs/default.js";

const generateDownloadLink = async (key:string) => {

  const command = new GetObjectCommand({
    Bucket: config.BUCKET_NAME,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 * 10 }); // 10 min
  return signedUrl;
};


export default generateDownloadLink;