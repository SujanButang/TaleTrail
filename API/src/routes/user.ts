import { Router } from "express";
import {
  handleGetMyDetails,
  handleGetUsers,
  handleSingleUser,
  handleUpdateProfile,
} from "../controllers/userController";
import { verifyAuth } from "../middlewares/authHandler";
const router = Router();

router.get("/users", handleGetUsers);
router.get("/me", verifyAuth, handleGetMyDetails);
router.get("/singleUser", handleSingleUser);
router.put("/updateProfile", verifyAuth, handleUpdateProfile);

export { router as UserRoutes };
