const { Model, DataTypes } = require('sequelize');

class UserChatRoom extends Model {
  static associate(models) {
    // Correcting foreign key references to align with the PostgreSQL table definitions
    UserChatRoom.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    UserChatRoom.belongsTo(models.ChatRoom, {
      foreignKey: 'chatRoomId',
      as: 'chatRoom',
    });
  }
}

module.exports = (sequelize) => {
  UserChatRoom.init({
    // Adjusting to camelCase to match Sequelize conventions and the table structure
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    chatRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'member'
    },
    // Including createdAt and updatedAt to match the table structure
    createdAt: {
      type: DataTypes.DATE, // Mapping to 'timestamp with time zone'
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE, // Mapping to 'timestamp with time zone'
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserChatRoom',
    timestamps: true, // Adjusting to true to automatically handle createdAt and updatedAt
  });

  return UserChatRoom;
};

