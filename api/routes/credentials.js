import express from "express";
import { updateLogin, checkPassword } from "../controllers/credential.js";

const router = express.Router();

router.get("/", checkPassword);
router.put("/", updateLogin);

export default router;
