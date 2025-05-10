import { Router,Request,Response} from "express";
import jwtVerifyMiddleWare from "../middlewares/verifyToken.js";
import linkGenerator from "../utils/awsUploadLinkGenerator.js";
import getHash from "../utils/hashFunction.js"

const router = Router();

// Just for testing purpose I am removing this
// becuase I dont want this login condition again and
// again
router.use(jwtVerifyMiddleWare);

router.get("/api/file", (req:Request,res:Response) => {
  // it sends the file available to download to user if yes 
  // like it sends the link available for download from amazon
  // s3 and when user clicks on download button in front end
  // it simply sends request to DELETE /api/file

  // if not available it simple sends 404 not found 
  res.sendStatus(404);
})

router.post("/api/fileHash",async (req:Request,res:Response) => {
  // it will recieve 
  // email can be fetched from jwt token itself
  // {md5ofFile}
  // it will recive sha256 of the file that user calculated
  // which will be linked to make new key as 
  // sha-256(email+"random keys of lenght 10" + sha256(file))
  // so it will generate link for amazon s3 bucket upload 
  // and it will also push job such that api delete file will be called
  // after 30 minutes(default) (or as required by user) if not downloaded.
  const { email } = req.user as {email:string};
  const {fileType} = req.body;
  
  res.json({
    link: await linkGenerator(getHash(email),fileType)
  }).send();
})

router.delete("/api/file", (req:Request,res:Response) => {
  // it handles the logic for removing data from 
  // amazon s3 bucket if exists if not simply ignore it
  res.send("In DELETE /api/file");
})

export default router;
