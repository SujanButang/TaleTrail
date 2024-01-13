import { Router } from "express";
import { verifyAuth } from "../middlewares/authHandler";
import {
  handleAddLike,
  handleGetBlogLikesCount,
  handleHasLike,
} from "../controllers/likeController";
const router = Router();

router.post("/", verifyAuth, handleAddLike);
router.get("/", handleGetBlogLikesCount);
router.get("/hasLiked", verifyAuth, handleHasLike);
export { router as LikeRoutes };
