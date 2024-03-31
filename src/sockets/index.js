const { Server } = require("socket.io");
const setupChatHandlers = require("./chat");
const { EVENTS } = require("../constants");
function setupSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    setupChatHandlers(socket, io);
  });
}

module.exports = setupSocketIO;
