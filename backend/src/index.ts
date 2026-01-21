import express from "express";
import cors from "cors";
import timeEntriesRouter from "./routes/timeEntries";

// Initialize Express app
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Use the time entries router for handling /time-entries routes
app.use("/time-entries", timeEntriesRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
