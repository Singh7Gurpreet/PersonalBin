import s3Client from "../lib/singletonS3Client.js";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import config from "../configs/default.js";
import getHash from "./hashFunction.js";
import generateDownloadLink from "./awsDownloadLinkGenerator.js";

const awsGetFile = async (email:string) => {
    const res = generateDownloadLink(getHash(email));
    return res;
};

export default awsGetFile;