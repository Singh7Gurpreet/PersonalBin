import { Router,Request,Response} from "express";
import jwtVerifyMiddleWare from "../middlewares/verifyToken.js";
import verifyJWT from "../controllers/api/verifyJWT.js";

const router = Router();

router.use(jwtVerifyMiddleWare);

router.get("/api/verifyjwt", verifyJWT);

export default router;
