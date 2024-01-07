import { Router } from "express";
import { handleUserRegistration, handleVerifyEmail, handleVerifyOTP } from "../controllers/AuthController";

const router = Router();

router.post("/verifyEmail",handleVerifyEmail)
router.post("/verifyOTP", handleVerifyOTP)
router.post("/register", handleUserRegistration)

export  {router as AuthRoutes};