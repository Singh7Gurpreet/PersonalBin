import { Request, Response } from "express";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import linkGenerator from "../../utils/awsUploadLinkGenerator.js";
import getHash from "../../utils/hashFunction.js";
import awsGetFile from "../../utils/awsGetFiles.js";

const getFile = async (req: Request, res: Response) => {
  try {
    const { email } = req.user as { email: string };
    const fileLink = await awsGetFile(email);
    return res.json({link:fileLink});
  } catch (error) {
    return res.status(404).json({ error: "Not found any file linked to user" });
  }
};

export default getFile;
