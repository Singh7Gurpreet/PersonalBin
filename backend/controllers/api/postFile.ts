// src/controllers/fileUploadController.ts
import { Request, Response } from "express";
import linkGenerator from "../../utils/awsUploadLinkGenerator.js";
import { TYPE_OF_FILE } from "../../utils/TypeOfFileEnums.js";

const createUploadHandler = (type: TYPE_OF_FILE) => {
  return async (req: Request, res: Response) => {
    try {
      const { email } = req.user as { email: string };
      const { fileName } = req.body as { fileName: string };

      const fileLink = await linkGenerator(email, fileName, type);
      return res.json({ link: fileLink });
    } catch (error) {
      console.error(`Error generating ${type} file upload link:`, error);
      return res.status(500).json({ error: "Failed to generate link" });
    }
  };
};

export const postStorageFile = createUploadHandler(TYPE_OF_FILE.STORAGE);
export const postClipboardFile = createUploadHandler(TYPE_OF_FILE.CLIPBOARD);
