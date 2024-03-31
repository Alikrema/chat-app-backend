const { ChatRoom, User } = require("../../../db/models");

const getRoom = async (req, res) => {
  const { id } = req.params;
  const room = await ChatRoom.findByPk(id, {
    include: [
      {
        model: User,
        as: "Users",
        attributes: ["id", "username"],
        through: { attributes: [] },
      },
    ],
  });
  res.json(room);
};

module.exports = getRoom;
