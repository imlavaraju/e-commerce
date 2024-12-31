import mongoose from "mongoose";
import product from "./models/product.js"; // Update the path as needed
import "dotenv/config";

// Connect to MongoDB
const updateExistingProducts = async () => {
  try {
    await mongoose.connect(process.env.DB_CON, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Update all documents to include comments and reviews if not present
    const result = await product.updateMany(
      {},
      {
        $set: {
          comments: [], // Initialize as empty array
          reviews: 0,   // Initialize as 0
        },
      }
    );

    console.log(`${result.modifiedCount} products updated.`);
  } catch (error) {
    console.error("Error updating products:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

updateExistingProducts();
