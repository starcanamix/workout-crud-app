import express from "express";
import { login, singup } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", singup);
router.post("/login", login);

export default router;