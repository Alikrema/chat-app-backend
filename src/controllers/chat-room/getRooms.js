const { ChatRoom, User } = require("../../../db/models");

const getRooms = async (req, res) => {
  const rooms = await ChatRoom.findAll({
    include: [
      {
        model: User,
        as: "Users",
        attributes: ["id", "username"],
        through: { attributes: [] },
      },
    ],
  });
  res.json(rooms);
};

module.exports = getRooms;
