import { Router } from "express";
import { verifyAuth } from "../middlewares/authHandler";
import {
  handleCheckRelation,
  handleGetFollowers,
  handleGetFollowings,
  handleNewRelation,
} from "../controllers/relationshipController";
const router = Router();

router.post("/", verifyAuth, handleNewRelation);
router.get("/followers", handleGetFollowers);
router.get("/followings", handleGetFollowings);
router.get("/check", verifyAuth, handleCheckRelation);

export { router as RelationRoutes };
