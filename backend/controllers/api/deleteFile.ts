import { Request, Response} from "express";
import awsDeleteFile from "../../utils/awsDeleteFile.js";
import { TYPE_OF_FILE } from "../../utils/TypeOfFileEnums.js";

const deleteFileCreator = (type:TYPE_OF_FILE) => {
  return async (req: Request, res: Response) => {
  try{
    const { email }  = req.user as {email:string};
    await awsDeleteFile(email,type);
    res.status(200).json({message : "OK"});
  } catch (error) {
    res.status(500).json({message : error});
  }
  };
}

export const deleteClipboardFile = deleteFileCreator(TYPE_OF_FILE.CLIPBOARD);
export const deleteStorageFile = deleteFileCreator(TYPE_OF_FILE.STORAGE);