import { Router } from "express";
import {
  handleGetAllBlogs,
  handleNewBlog,
} from "../controllers/blogController";
import { verifyAuth } from "../middlewares/authHandler";
const router = Router();

router.post("/",verifyAuth, handleNewBlog);
router.get("/", handleGetAllBlogs);

export { router as BlogRoutes };
