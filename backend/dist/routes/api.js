import { Router } from "express";
import jwtVerifyMiddleWare from "../middlewares/verifyToken.js";
import postFile from "../controllers/api/postFile.js";
import getFile from "../controllers/api/getFile.js";
import deletefile from "../controllers/api/deleteFile.js";
const router = Router();
// Just for testing purpose I am removing this
// becuase I dont want this login condition again and
// again
router.use(jwtVerifyMiddleWare);
router.get("/api/file", getFile);
router.post("/api/file", postFile);
router.delete("/api/file", deletefile);
export default router;
