import { Router } from "express";
import {
  handleDeletBlog,
  handleGetAllBlogs,
  handleGetSingleBlog,
  handleNewBlog,
  handleUserBlog,
} from "../controllers/blogController";
import { verifyAuth } from "../middlewares/authHandler";
import { validateReqBody, validateReqQuery } from "../middlewares/validator";
import {
  blogSchema,
  getDeleteBlogSchema,
  getSingleBlogSchema,
  getUserBlogSchema,
} from "../schemas/blogSchema";
const router = Router();

router.post("/", verifyAuth, validateReqBody(blogSchema), handleNewBlog);
router.get("/", handleGetAllBlogs);
router.get(
  "/single",
  validateReqQuery(getSingleBlogSchema),
  handleGetSingleBlog
);
router.get("/userBlogs", validateReqQuery(getUserBlogSchema), handleUserBlog);
router.delete(
  "/",
  verifyAuth,
  validateReqQuery(getDeleteBlogSchema),
  handleDeletBlog
);

export { router as BlogRoutes };
