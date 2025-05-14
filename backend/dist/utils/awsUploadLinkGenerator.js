var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import s3Client from "../lib/singletonS3Client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import config from "../configs/default.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import readyKey from "./hashFunctions.js";
function linkGenerator(email, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new PutObjectCommand({
            Bucket: config.BUCKET_NAME,
            Key: `${readyKey(email)}$$${name}`,
        });
        return yield getSignedUrl(s3Client, command, { expiresIn: 900 });
    });
}
export default linkGenerator;
