import { Router,Request,Response} from "express";
import jwtVerifyMiddleWare from "../middlewares/verifyToken.js";
const router = Router();

router.use(jwtVerifyMiddleWare);

router.get("/api/file", (req:Request,res:Response) => {
  // it sends the file available to download to user if yes 
  // like it sends the link available for download from amazon
  // s3 and when user clicks on download button in front end
  // it simply sends request to DELETE /api/file

  // if not available it simple sends 404 not found 
  res.send("In GET /api/file");
})

router.post("/api/file", (req:Request,res:Response) => {
  // it will recieve 
  // email can be fetched from jwt token itself
  // {md5ofFile}
  // it will recive md5 of the file that user calculated
  // which will be linked to make new key as 
  // sha-256(email+"random keys upto lenght 10" + md5(file))
  // so it will generate link for amazon s3 bucket upload 
  // and it will also push job such that api delete file will be called
  // after 30 minutes(default) (or as required by user) if not downloaded.
  res.send("In POST /api/file");
})

router.delete("/api/file", (req:Request,res:Response) => {
  // it handles the logic for removing data from 
  // amazon s3 bucket if exists if not simply ignore it
  res.send("In DELETE /api/file");
})

export default router;
