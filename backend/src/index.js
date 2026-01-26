import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../lib/db.js";
import path from "path";
import authRoutes from "../routes/auth.route.js";
import messageRoutes from "../routes/message.route.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

const port = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res, next) => {
    if (req.path.startsWith("/api/")) {
      return next();
    }
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});
