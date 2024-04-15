const chatServices = require("../../services/chat-room");

const getRoom = async (req, res) => {
  const { id } = req.params;
  const room = await chatServices.getRoom(id);
  res.json(room);
};

module.exports = getRoom;
