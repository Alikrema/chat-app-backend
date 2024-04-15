const { ChatRoom, User } = require("../../../db/models");

const getRoom = async (id) => {
  try {
    const room = await ChatRoom.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "username"],
          through: { attributes: [] },
        },
      ],
    });
    return room;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getRoom };
