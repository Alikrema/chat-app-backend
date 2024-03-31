const { Server } = require("socket.io");
const setupChatHandlers = require("./chat");

function setupSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Setup all event handlers
    setupChatHandlers(socket, io);

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = setupSocketIO;
