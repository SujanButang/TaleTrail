import { Router } from "express";
import { AuthRoutes } from "./auth";
import { TopicRoutes } from "./topic";
import { verifyAuth } from "../middlewares/authHandler";
import { BlogRoutes } from "./blogRoute";
import { UserRoutes } from "./user";
import { ReadingListRoutes } from "./readingListRoute";
import { LikeRoutes } from "./likeRoute";
import { RelationRoutes } from "./relationshipRoute";
import { CommentRoutes } from "./commentRoute";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/topic", TopicRoutes);
router.use("/blog", BlogRoutes);
router.use("/user", UserRoutes);
router.use("/readingList", verifyAuth, ReadingListRoutes);
router.use("/like", LikeRoutes);
router.use("/relationship", RelationRoutes);
router.use("/comment", CommentRoutes);

export default router;
