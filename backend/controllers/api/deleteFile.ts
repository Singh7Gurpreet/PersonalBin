import { Request, Response} from "express";
import awsDeleteFile from "../../utils/awsDeleteFile.js";

const deleteFileS3 = async (req: Request, res: Response) => {
  try{
    const { email }  = req.user as {email:string};
    await awsDeleteFile(email);
  } catch (error) {
    res.status(500).json({message : error});
  }
}

export default deleteFileS3;