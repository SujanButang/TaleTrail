import { Router } from "express";
import { handleGetMyDetails } from "../controllers/userController";
import { verifyAuth } from "../middlewares/authHandler";
const router = Router();

router.get("/me", verifyAuth, handleGetMyDetails);

export { router as UserRoutes };
