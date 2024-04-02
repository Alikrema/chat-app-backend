const { ChatRoom, UserChatRoom } = require("../../../db/models");
const { col } = require("sequelize");

const getRooms = async (req, res) => {
  const { userId } = req;
  const rooms = await UserChatRoom.findAll({
    where: { userId },
    attributes: [
      [col("ChatRoom.id"), "id"],
      [col("ChatRoom.name"), "name"],
    ],
    include: [
      {
        model: ChatRoom,
        as: "ChatRoom",
        attributes: [],
      },
    ],
  });
  res.json(rooms);
};
module.exports = getRooms;
