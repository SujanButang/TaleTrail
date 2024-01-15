import { Router } from "express";
import {
  handleUserLogin,
  handleUserLogout,
  handleUserRegistration,
  handleVerifyEmail,
  handleVerifyOTP,
} from "../controllers/authController";
import { validateReqBody } from "../middlewares/validator";
import {
  emailSchema,
  loginSchema,
  otpSchema,
  signupSchema,
} from "../schemas/authSchema";

const router = Router();

router.post("/verifyEmail", validateReqBody(emailSchema), handleVerifyEmail);
router.post("/verifyOTP", validateReqBody(otpSchema), handleVerifyOTP);
router.post("/register", validateReqBody(signupSchema), handleUserRegistration);
router.post("/login", validateReqBody(loginSchema), handleUserLogin);
router.get("/logout", handleUserLogout);

export { router as AuthRoutes };
