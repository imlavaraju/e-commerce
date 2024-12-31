import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "place enter your name."],
  },
  description: {
    type: String,
    required: [true, "place enter your description."],
  },
  price: {
    type: Number,
    required: [true, "place enter your price."],
  },
  image: {
    type: Array,
    required: [true, "place enter your image."],
  },
  category: {
    type: String,
    required: [true, "place enter your categery."],
  },
  subCategory: {
    type: String,
    required: [true, "place enter your sub categery."],
  },
  sizes: {
    type: Array,
    required: [true, "place enter your size."],
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Number,
    required: [true, "place enter your data."],
  },
   comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
      name: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  reviews: {
    type: Number,
    default: 0, // Holds the average rating
  },
});

const product =
  mongoose.models.product || mongoose.model("product", productSchema);

export default product;
