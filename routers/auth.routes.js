import express from "express";
import {
  getLogin,
  createUser,
  getAllUser,
} from "../controllers/authControllers/auth.controller.js";
import { authentication } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/login", getLogin);
router.post("/createuser", createUser);

router.get("/get-all-user", authentication, getAllUser);

export default router;
