import product from "../models/product.js";
import { asyncError } from "../utils/asyncError.js";
import { CustomeError } from "../utils/customeError.js";
import user from "../models/user.js";
import mongoose from "mongoose";

// Add Comment and Review
const addCommentAndReview = asyncError(async (req, res, next) => {
  const { userId, productId, comment, rating } = req.body;
  const userData = await user.findById(userId)
  console.log(userData.name)

  // Validate inputs
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return next(new CustomeError("Invalid Product ID", 400));
  }
  if (!rating || rating < 1 || rating > 5) {
    return next(new CustomeError("Rating must be between 1 and 5", 400));
  }

  const productData = await product.findById(productId);
  if (!productData) {
    return next(new CustomeError("Product not found", 404));
  }

  const newComment = {
    userId,
    comment,
    name:userData.name,
    rating,
    date: Date.now(),
  };

  // Add new comment
  productData.comments.push(newComment);
  console.log(newComment)
  console.log(productData)

  // Update average rating
  const totalRatings = productData.comments.reduce((sum, c) => sum + c.rating, 0);
  productData.reviews = totalRatings / productData.comments.length;

  try {
    await productData.save();
    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data:", error);
    return next(new CustomeError("Failed to save comment and review", 500));
  }
  
  res.status(200).json({
    status: "success",
    message: "Comment and review added successfully",
    data: {
      comments: productData.comments,
      reviews: productData.reviews,
    },
  });
});


// Fetch All Comments for a Product
const getProductComments = asyncError(async (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return next(new CustomeError("Invalid Product ID", 400));
  }

  const productData = await product.findById(productId);

  if (!productData) {
    return next(new CustomeError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    comments: productData.comments,
  });
});


export { addCommentAndReview, getProductComments };
