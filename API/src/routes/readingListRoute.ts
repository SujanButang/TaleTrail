import { Router } from "express";
import {
  handleAddToReadingList,
  handleGetUserReadingList,
  handleRemoveFromReadingList,
} from "../controllers/readingListController";
import { validateReqQuery } from "../middlewares/validator";
import { readingListSchema } from "../schemas/readingListSchema";
const router = Router();

router.post("/", validateReqQuery(readingListSchema), handleAddToReadingList);
router.get("/", handleGetUserReadingList);
router.delete(
  "/",
  validateReqQuery(readingListSchema),
  handleRemoveFromReadingList
);

export { router as ReadingListRoutes };
