import { Request, Response } from "express";
import linkGenerator from "../../utils/awsUploadLinkGenerator.js";
import getHash from "../../utils/hashFunction.js";

const postFile = async (req: Request, res: Response) => {
  try {
    const { email } = req.user as { email: string };
    const { fileType } = req.body;

    const link = await linkGenerator(getHash(email), fileType);

    return res.json({ link });
  } catch (error) {
    console.error("Error generating file upload link:", error);
    return res.status(500).json({ error: "Failed to generate link" });
  }
};

export default postFile;
