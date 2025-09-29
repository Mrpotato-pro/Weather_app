import express from "express";
import cors from "cors";
import weatherRouter from "./routes/weather.js"; // ✅ keep .js if using "type": "module"

const app = express();
app.use(cors());

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Weather route
app.use("/weather", weatherRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
