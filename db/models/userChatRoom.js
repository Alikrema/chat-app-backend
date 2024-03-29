const { Model, DataTypes } = require('sequelize');

class UserChatRoom extends Model {
  static associate(models) {
    UserChatRoom.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user', 
    });

    UserChatRoom.belongsTo(models.ChatRoom, {
      foreignKey: 'chatroom_id',
      as: 'chatRoom', 
    });
  }
}
module.exports = (sequelize) => {
  UserChatRoom.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    chatroom_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'member'
    }
    // No created_at or updated_at fields are defined, assuming this join table doesn't need them.
  }, {
    sequelize,
    modelName: 'UserChatRoom',
    timestamps: false // This table does not use Sequelize's automatic timestamp columns
  });

  return UserChatRoom;
};

