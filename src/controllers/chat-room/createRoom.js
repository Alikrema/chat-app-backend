const { ChatRoom, User, UserChatRoom } = require("../../../db/models");
const createRoomNameByMembers = require("../../utils/createRoomNameByMembers");

const createRoom = async (req, res) => {
  const { members } = req.body;
  let { name } = req.body;
  if (!name) {
    name = createRoomNameByMembers(members);
  }
  const room = await ChatRoom.create({ name });
  const promises = members.map(async (member) => {
    console.log("member", member);
    const user = await User.findOne({ where: { username: member } });
    if (!user) {
      return;
    }
    return UserChatRoom.create({
      userId: user.id,
      chatRoomId: room.id,
    });
  });

  await Promise.all(promises);
  res.json(room);
};

module.exports = createRoom;
