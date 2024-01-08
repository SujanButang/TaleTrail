import { Router } from "express";
import { handleUserLogin, handleUserLogout, handleUserRegistration, handleVerifyEmail, handleVerifyOTP } from "../controllers/authController";

const router = Router();

router.post("/verifyEmail",handleVerifyEmail)
router.post("/verifyOTP", handleVerifyOTP)
router.post("/register", handleUserRegistration)
router.post("/login",handleUserLogin)
router.get("/logout",handleUserLogout)

export  {router as AuthRoutes};