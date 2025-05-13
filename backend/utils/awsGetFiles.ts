import generateDownloadLink from "./awsDownloadLinkGenerator.js";

const awsGetFile = async (email:string) => {
    const res = generateDownloadLink(email);
    return res;
};

export default awsGetFile;