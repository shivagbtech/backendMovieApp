import express from "express";
import {
  getLogin,
  createUser,
} from "../controllers/authControllers/auth.controller.js";

const router = express.Router();

router.get("/login", getLogin);
router.post("/createuser", createUser);

export default router;
