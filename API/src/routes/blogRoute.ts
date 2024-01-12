import { Router } from "express";
import {
  handleGetAllBlogs,
  handleGetSingleBlog,
  handleNewBlog,
} from "../controllers/blogController";
import { verifyAuth } from "../middlewares/authHandler";
const router = Router();

router.post("/", verifyAuth, handleNewBlog);
router.get("/", handleGetAllBlogs);
router.get("/single", handleGetSingleBlog);

export { router as BlogRoutes };
