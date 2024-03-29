const { Model, DataTypes } = require('sequelize');

class ChatRoom extends Model {
  static associate(models) {
    ChatRoom.belongsToMany(models.User, { through: 'UserChatRoom', foreignKey: 'chatroom_id' });
    ChatRoom.hasMany(models.Message, { foreignKey: 'room_id' });
  }
}

module.exports = (sequelize) => {
  ChatRoom.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChatRoom',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return ChatRoom;
};

