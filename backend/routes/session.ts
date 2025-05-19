import { Router } from "express";
import  getKey from "../controllers/api/getKey.js";

const router = Router();

router.get("/session/key",getKey);

export default router;