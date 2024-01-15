import { Router } from "express";
import { verifyAuth } from "../middlewares/authHandler";
import {
  handleAddComment,
  handleGetAllComments,
  handleRemoveComment,
} from "../controllers/commentController";
import { validateReqBody, validateReqQuery } from "../middlewares/validator";
import {
  deleteCommentSchema,
  newCommentBodySchema,
  newCommentQuerySchema,
} from "../schemas/commentSchema";
const router = Router();

router.post(
  "/",
  verifyAuth,
  validateReqQuery(newCommentQuerySchema),
  validateReqBody(newCommentBodySchema),
  handleAddComment
);
router.delete(
  "/",
  verifyAuth,
  validateReqQuery(deleteCommentSchema),
  handleRemoveComment
);
router.get("/", validateReqQuery(newCommentQuerySchema), handleGetAllComments);

export { router as CommentRoutes };
