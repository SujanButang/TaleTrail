import { Router } from "express";
import { verifyAuth } from "../middlewares/authHandler";
import {
  handleCheckRelation,
  handleGetFollowers,
  handleGetFollowings,
  handleNewRelation,
} from "../controllers/relationshipController";
import { validateReqQuery } from "../middlewares/validator";
import {
  checkRelationSchema,
  followerSchema,
  relationshipSchema,
} from "../schemas/relationshipSchema";
const router = Router();

router.post(
  "/",
  verifyAuth,
  validateReqQuery(relationshipSchema),
  handleNewRelation
);
router.get("/followers", validateReqQuery(followerSchema), handleGetFollowers);
router.get(
  "/followings",
  validateReqQuery(followerSchema),
  handleGetFollowings
);
router.get(
  "/check",
  verifyAuth,
  validateReqQuery(checkRelationSchema),
  handleCheckRelation
);

export { router as RelationRoutes };
