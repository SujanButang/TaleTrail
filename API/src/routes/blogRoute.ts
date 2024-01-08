import { Router } from "express";
import { handleNewBlog } from "../controllers/blogController";
const router = Router();

router.post("/", handleNewBlog);

export { router as BlogRoutes };
