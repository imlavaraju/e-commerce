import JWT from "jsonwebtoken";
import user from "../models/user.js";
import { asyncError } from "../utils/asyncError.js";
import { CustomeError } from "../utils/customeError.js";

// Registration

export const registor = asyncError(async (req, res, next) => {
  try {
    // Check if the email already exists
    const existingUser = await user.findOne({ email: req.body.email });
    if (existingUser) {
      const err = new CustomeError("Email already exists", 400);
      return next(err);  // Send custom error to the next middleware
    }

    // Create a new user
    const newUser = await user.create(req.body);

    // Generate JWT token
    const token = JWT.sign({ id: newUser.id }, "secret", {
      expiresIn: "24h",  // Set token expiration (e.g., 24 hours)
    });

    res.status(200).json({
      status: "success",
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    next(error);  // Forward the error to the error-handling middleware
  }
});



// Login
export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const existeUser = await user.findOne({ email });
  if (!existeUser) {
    const err = new CustomeError("User doesn't exist with this email ID", 400);
    return next(err);
  }

  const isPasswordCorrect = await existeUser.comparePassword(password, existeUser.password);
  if (!isPasswordCorrect) {
    const err = new CustomeError("Incorrect password!", 400);
    return next(err);
  }

  const token = JWT.sign({ id: existeUser.id }, "your-hardcoded-secret-key", {
    expiresIn: '24h',
  });

  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    token,
  });
});

// Admin login
export const admin = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (
    email === "admin@example.com" && // Use hardcoded admin email
    password === "your-admin-password" // Use hardcoded admin password
  ) {
    const token = JWT.sign({ email, password }, "your-admin-secret-key", { expiresIn: '24h' });
    res.status(200).json({
      status: "success",
      token,
    });
  } else {
    res.status(401).json({
      status: "fail",
      message: "Invalid credentials",
    });
  }
});
