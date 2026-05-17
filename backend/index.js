// External packages
import "dotenv/config";
import express from "express";
import cors from "cors";

// Internal imports
import db_connect from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://veltrix-platform.onrender.com"
  ],
  credentials: true
}));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.use("/api/auth", authRoutes);

// DB connect
db_connect();

// Server start
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});