import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import { connect } from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json()); // this middleware is used to parse JSON boddies
app.use(rateLimiter); // Apply rate limiting middleware to all routes
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

app.use("/api/notes", notesRoutes);


//SERVER LISTENING
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:", PORT);
  });
}).catch((error) => {
  console.error("Failed to connect to the database:", error);
  process.exit(1); // Exit with failure
});
