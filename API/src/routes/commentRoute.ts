import { Router } from "express";
import { verifyAuth } from "../middlewares/authHandler";
import {
  handleAddComment,
  handleGetAllComments,
  handleRemoveComment,
} from "../controllers/commentController";
const router = Router();

router.post("/", verifyAuth, handleAddComment);
router.delete("/", verifyAuth, handleRemoveComment);
router.get("/", handleGetAllComments);

export { router as CommentRoutes };
