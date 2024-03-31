const createRoomNameByMembers = (members) => {
  return members.sort().join(" ");
};

module.exports = createRoomNameByMembers;
