const { EVENTS } = require("../constants");
const { saveMessage } = require("../services/messages");

function setupChatHandlers(socket, io) {
  socket.on(EVENTS.USER_JOINED, ({ username, timestamp, chatRoomId }) => {
    socket.join(chatRoomId);
    io.to(chatRoomId).emit(EVENTS.USER_JOINED, { username, timestamp });
  });
  socket.on(EVENTS.USER_LEFT, ({ username, timestamp, chatRoomId }) => {
    socket.leave(chatRoomId);
    io.to(chatRoomId).emit(EVENTS.USER_LEFT, { username, timestamp });
  });
  socket.on(EVENTS.CHAT_MESSAGE, async (msg) => {
    const { username, message, timestamp, chatRoomId } = msg;
    io.to(chatRoomId).emit(EVENTS.CHAT_MESSAGE, {
      username,
      message,
      timestamp,
    });
    await storeMessage(msg);
  });
}

async function storeMessage(msg) {
  await saveMessage(msg);
}

module.exports = setupChatHandlers;
