const express = require("express");
const multer = require("multer");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from the frontend
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Set up Multer for file uploads
const upload = multer({
  dest: "uploads/", // Directory where uploaded files will be stored
});

// Handle file upload
app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const interval = parseInt(req.body.interval, 10);

  if (!file || isNaN(interval)) {
    return res.status(400).send("Invalid file or interval.");
  }

  // Emit the file processing event via WebSocket
  processFile(file.path, interval);
  res.status(200).send("File uploaded and processing started.");
});

// WebSocket connection
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Function to process the file and emit lines via WebSocket
function processFile(filePath, interval) {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n"); // Read and split file into lines
  const totalLines = lines.length;

  let lineIndex = 0;

  const intervalId = setInterval(() => {
    if (lineIndex < totalLines) {
      // Emit the current line and progress
      io.emit("line", {
        line: lines[lineIndex],
        progress: Math.floor(((lineIndex + 1) / totalLines) * 100),
      });
      lineIndex++;
    } else {
      // Emit completion event and stop the interval
      io.emit("complete");
      clearInterval(intervalId);

      // Delete the uploaded file after processing
      fs.unlinkSync(filePath);
    }
  }, interval);
}

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
