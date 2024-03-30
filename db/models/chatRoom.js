const { Model, DataTypes } = require('sequelize');

class ChatRoom extends Model {
  static associate(models) {
    // Correcting foreign key references to align with the PostgreSQL table definitions
    ChatRoom.belongsToMany(models.User, { through: 'UserChatRoom', foreignKey: 'chatRoomId' });
    ChatRoom.hasMany(models.Message, { foreignKey: 'chatRoomId' }); // Adjusted to 'chatRoomId' to match the foreign key in the messages table
  }
}

module.exports = (sequelize) => {
  ChatRoom.init({
    name: {
      type: DataTypes.STRING, // Ensuring the data type matches character varying(255)
      allowNull: false // Explicitly setting allowNull to false to match the table schema
    },
    // No need to define ID, Sequelize does it by default
    createdAt: { // Correcting to match the exact case and format of the table
      type: DataTypes.DATE, // Matching timestamp with time zone
      allowNull: false,
      field: 'createdAt' // Sequelize automatically handles camelCase to snake_case conversion, but specifying to align with table schema
    },
    updatedAt: { // Similarly, adjusting for the updatedAt column
      type: DataTypes.DATE, // Matching timestamp with time zone
      allowNull: false,
      field: 'updatedAt' // Ensuring it aligns with the PostgreSQL column exactly
    }
  }, {
    sequelize,
    modelName: 'ChatRoom',
    timestamps: true, // Enables automatic handling of createdAt and updatedAt
    // Sequelize automatically uses the correct fields for createdAt and updatedAt if timestamps are true and fields are named in camelCase
  });

  return ChatRoom;
};

