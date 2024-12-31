import express from "express";
import {
  addCommentAndReview,
  getProductComments,
} from "../controllers/reviewsController.js";

import { auth } from "../middleware/auth.js";
const router = express.Router();

// Add a comment and review
router.post("/comment",auth ,addCommentAndReview);

// Get all comments for a product
router.get("/comments/:productId", getProductComments);

export default router;
