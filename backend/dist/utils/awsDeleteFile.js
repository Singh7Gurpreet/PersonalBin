var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import s3Client from "../lib/singletonS3Client.js";
import config from "../configs/default.js";
import readyKey from "./hashFunctions.js";
const deleteItemFromS3 = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const key = readyKey(email);
    try {
        const listCommand = new ListObjectsV2Command({
            Bucket: config.BUCKET_NAME,
            Prefix: key,
        });
        const listResponse = yield s3Client.send(listCommand);
        const objects = listResponse.Contents || [];
        if (objects.length === 0) {
            throw new Error("No file for this user");
        }
        const objectKey = objects[0].Key;
        const command = new DeleteObjectCommand({
            Bucket: config.BUCKET_NAME,
            Key: objectKey
        });
        const response = yield s3Client.send(command);
        console.log("Deleted successfully:", key);
        return response;
    }
    catch (error) {
        console.error("Error deleting object:", error);
        throw error;
    }
});
export default deleteItemFromS3;
