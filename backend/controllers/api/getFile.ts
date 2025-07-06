// src/controllers/getFileController.ts
import { Request, Response } from "express";
import { TYPE_OF_FILE } from "../../utils/TypeOfFileEnums.js";
import awsGetFile from "../../utils/awsGetFiles.js";

const createGetFileHandler = (type: TYPE_OF_FILE) => {
  return async (req: Request, res: Response) => {
    try {
      const { email } = req.user as { email: string };

      const fileLink = await awsGetFile(email, type);

      return res.json({
        link: fileLink.signedUrl,
        timeStamp: fileLink.timeStamp,
        fileName: fileLink.filename
      });

    } catch (error) {
      return res.status(404).json({ error: "Not found any file linked to user" });
    }
  };
};

export const getClipboardFile = createGetFileHandler(TYPE_OF_FILE.CLIPBOARD);
export const getStorageFile = createGetFileHandler(TYPE_OF_FILE.STORAGE);
