import { Router } from "express";
import { verifyAuth } from "../middlewares/authHandler";
import {
  handleAddLike,
  handleGetBlogLikesCount,
  handleHasLike,
} from "../controllers/likeController";
import { validateReqQuery } from "../middlewares/validator";
import { newLikeSchema } from "../schemas/likeSchema";
const router = Router();

router.post("/", verifyAuth, validateReqQuery(newLikeSchema), handleAddLike);
router.get("/", validateReqQuery(newLikeSchema), handleGetBlogLikesCount);
router.get("/hasLiked", verifyAuth, handleHasLike);
export { router as LikeRoutes };
