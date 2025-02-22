const { Model, DataTypes } = require("sequelize");

class UserChatRoom extends Model {
  static associate(models) {
    // Correcting foreign key references to align with the PostgreSQL table definitions
    UserChatRoom.belongsTo(models.User, {
      foreignKey: "userId",
    });
    UserChatRoom.belongsTo(models.ChatRoom, {
      foreignKey: "chatRoomId",
    });
  }
}

module.exports = (sequelize) => {
  UserChatRoom.init(
    {
      // Adjusting to camelCase to match Sequelize conventions and the table structure
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chatRoomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE, // Mapping to 'timestamp with time zone'
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE, // Mapping to 'timestamp with time zone'
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserChatRoom",
      timestamps: true, // Adjusting to true to automatically handle createdAt and updatedAt
      tableName: "chat_room_users",
    }
  );

  return UserChatRoom;
};
