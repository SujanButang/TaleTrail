import { Router } from "express";
import { handleGetAllTopics, handleNewTopic } from "../controllers/topicController";
import { verifyAuth } from "../middlewares/authHandler";

const router = Router();

router.post("/",verifyAuth, handleNewTopic);
router.get("/",handleGetAllTopics);

export { router as TopicRoutes };
