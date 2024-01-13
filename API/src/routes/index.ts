import { Router } from "express";
import { AuthRoutes } from "./auth";
import { TopicRoutes } from "./topic";
import { verifyAuth } from "../middlewares/authHandler";
import { BlogRoutes } from "./blogRoute";
import { UserRoutes } from "./user";
import { ReadingListRoutes } from "./readingListRoute";
import { LikeRoutes } from "./likeRoute";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/topic", TopicRoutes);
router.use("/blog", BlogRoutes);
router.use("/user", UserRoutes);
router.use("/readingList", verifyAuth, ReadingListRoutes);
router.use("/like", LikeRoutes);

export default router;
