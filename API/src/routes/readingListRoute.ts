import { Router } from "express";
import {
  handleAddToReadingList,
  handleGetUserReadingList,
  handleRemoveFromReadingList,
} from "../controllers/readingListController";
const router = Router();

router.post("/", handleAddToReadingList);
router.get("/", handleGetUserReadingList);
router.delete("/", handleRemoveFromReadingList);

export { router as ReadingListRoutes };
