const { EVENTS } = require("../constants");
const { saveMessage } = require("../services/messages");
const { getRoom } = require("../services/chat-room");
function setupChatHandlers(socket, io) {
  socket.on(EVENTS.USER_JOINED, ({ username, timestamp, chatRoomId }) => {
    socket.join(chatRoomId);
    console.log(`User ${username} joined room ${chatRoomId}`);
    io.to(chatRoomId).emit(EVENTS.USER_JOINED, { username, timestamp });
  });
  socket.on(EVENTS.USER_LEFT, ({ username, timestamp, chatRoomId }) => {
    socket.leave(chatRoomId);
    console.log(`User ${username} left room ${chatRoomId}`);
    io.to(chatRoomId).emit(EVENTS.USER_LEFT, { username, timestamp });
  });
  socket.on(EVENTS.CHAT_MESSAGE, async (msg) => {
    const { username, chatRoomId, timestamp } = msg;
    //TODO: store message with timestamp
    const newMessage = await storeMessage(msg);
    const { id, userId, message: newMessageText, createdAt } = newMessage;

    const roomDetails = await getRoom(chatRoomId);

    const roomUsers = roomDetails.dataValues.Users.dataValues;
    roomUsers.map((user) => {
      if (user.dataValues.username !== username) {
        io.to(user.dataValues.id).emit(EVENTS.NEW_MESSAGE_SAVED, {
          id,
          message: newMessageText,
          createdAt,
          User: {
            id: userId,
            username,
          },
        });
      }
    });

    const newMessageDto = {
      id,
      message: newMessageText,
      createdAt,
      User: {
        id: userId,
        username,
      },
    };
    io.to(chatRoomId).emit(EVENTS.NEW_MESSAGE_SAVED, newMessageDto);
  });
}

async function storeMessage(msg) {
  return await saveMessage(msg);
}

module.exports = setupChatHandlers;
