import express from "express";

import {  signup, login, logout, verifyEmail, admin } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/verify-email", verifyEmail)

router.post("/admin", admin)

export default router;