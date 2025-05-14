var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ListObjectsV2Command, GetObjectCommand, } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../lib/singletonS3Client.js";
import readyKey from "./hashFunctions.js";
const generateDownloadLink = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const key = readyKey(email);
    try {
        const listCommand = new ListObjectsV2Command({
            Bucket: process.env.BUCKET_NAME,
            Prefix: key,
        });
        const listResponse = yield s3Client.send(listCommand);
        const objects = listResponse.Contents || [];
        // Step 2: If no files found, throw error
        if (objects.length === 0) {
            throw new Error("No file for this user");
        }
        // Step 3: Use the first matched key
        const objectKey = objects[0].Key;
        const filename = objectKey.split("$$")[1];
        // Step 4: Generate signed URL
        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: objectKey,
            ResponseContentDisposition: `attachment; filename="${filename}"`,
        });
        const signedUrl = yield getSignedUrl(s3Client, command, { expiresIn: 600 });
        return signedUrl;
    }
    catch (error) {
        if (error.message !== "No file for this user") {
            console.error("Error generating download link:", error);
        }
        throw error;
    }
});
export default generateDownloadLink;
