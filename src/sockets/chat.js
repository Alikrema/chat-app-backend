function setupChatHandlers(socket, io) {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // Broadcasting the message to all clients
  });
}

module.exports = setupChatHandlers;
