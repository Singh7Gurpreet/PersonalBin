import generateDownloadLink from "./awsDownloadLinkGenerator.js";
import { TYPE_OF_FILE } from "./TypeOfFileEnums.js";

const awsGetFile = async (email:string, type:TYPE_OF_FILE) => {
    const res = generateDownloadLink(email,type);
    return res;
};

export default awsGetFile;