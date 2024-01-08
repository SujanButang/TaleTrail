import { Router } from "express";
import { AuthRoutes } from "./auth";
import { TopicRoutes } from "./topic";
import { verifyAuth } from "../middlewares/authHandler";
import { BlogRoutes } from "./blogRoute";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/topic", verifyAuth, TopicRoutes);
router.use("/blog", verifyAuth, BlogRoutes);
export default router;
