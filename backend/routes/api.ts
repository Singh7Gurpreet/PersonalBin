import { Router,Request,Response} from "express";
import jwtVerifyMiddleWare from "../middlewares/verifyToken.js";
import postFile from "../controllers/api/postFile.js";
import getFile from "../controllers/api/getFile.js";

const router = Router();

// Just for testing purpose I am removing this
// becuase I dont want this login condition again and
// again
router.use(jwtVerifyMiddleWare);

router.get("/api/file", getFile);

router.post("/api/file",postFile);

router.delete("/api/file", (req:Request,res:Response) => {
  // it handles the logic for removing data from 
  // amazon s3 bucket if exists if not simply ignore it
  res.send("In DELETE /api/file");
})

export default router;
