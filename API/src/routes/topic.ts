import { Router } from "express";
import { handleNewTopic } from "../controllers/topicController";

const router = Router();

router.post("/", handleNewTopic);

export { router as TopicRoutes };
