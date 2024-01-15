import { Router } from "express";
import {
  handleDeletBlog,
  handleGetAllBlogs,
  handleGetSingleBlog,
  handleNewBlog,
  handleUserBlog,
} from "../controllers/blogController";
import { verifyAuth } from "../middlewares/authHandler";
const router = Router();

router.post("/", verifyAuth, handleNewBlog);
router.get("/", handleGetAllBlogs);
router.get("/single", handleGetSingleBlog);
router.get("/userBlogs", handleUserBlog);
router.delete("/", verifyAuth, handleDeletBlog);

export { router as BlogRoutes };
