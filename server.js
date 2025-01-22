require("dotenv").config(); // Load environment variables

const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");

// Define the getEnvVar function
function getEnvVar(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
}

// Retrieve environment variables
const CLIENT_ORIGIN = getEnvVar("CLIENT_ORIGIN");
const PORT = getEnvVar("SERVER_PORT");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
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
server.listen(PORT, () => {
  console.info(`Server is running on ${CLIENT_ORIGIN}:${PORT}`);
});
