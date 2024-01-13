import { Router } from "express";
import {
  handleGetMyDetails,
  handleGetUsers,
} from "../controllers/userController";
import { verifyAuth } from "../middlewares/authHandler";
const router = Router();

router.get("/users", handleGetUsers);
router.get("/me", verifyAuth, handleGetMyDetails);

export { router as UserRoutes };
