import { Router,Request,Response} from "express";
import jwtVerifyMiddleWare from "../middlewares/verifyToken.js";
import { postClipboardFile,postStorageFile } from "../controllers/api/postFile.js";
import { getClipboardFile,getStorageFile } from "../controllers/api/getFile.js";
import { deleteClipboardFile, deleteStorageFile } from "../controllers/api/deleteFile.js";

const router = Router();

// Just for testing purpose I am removing this
// becuase I dont want this login condition again and
// again
router.use(jwtVerifyMiddleWare);

router.get("/api/clipboard/file", getClipboardFile);

router.post("/api/clipboard/file",postClipboardFile);

router.delete("/api/clipboard/file", deleteClipboardFile);

router.get("/api/storage/file", getStorageFile);

router.post("/api/storage/file",postStorageFile);

router.delete("/api/storage/file", deleteStorageFile);

export default router;
