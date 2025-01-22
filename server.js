const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// WebSocket connection
io.on("connection", (socket) => {
  console.info("Client connected");

  socket.on("disconnect", () => {
    console.info("Client disconnected");
  });
});

// Pass `io` to the app so it can be used in the services
app.set("io", io);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
