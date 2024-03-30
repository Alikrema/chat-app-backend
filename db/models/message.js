const { Model, DataTypes } = require('sequelize');

class Message extends Model {
  static associate(models) {
    // Adjusting foreign keys to match the PostgreSQL table
    Message.belongsTo(models.User, { foreignKey: 'userId' }); // Changed from 'sender_id' to 'userId'
    Message.belongsTo(models.ChatGroup, { foreignKey: 'chatRoomId' }); // Changed from 'group_id' to 'chatRoomId'
  }
}

module.exports = (sequelize) => {
  Message.init({
    content: {
      type: DataTypes.STRING(255), // Changed from DataTypes.TEXT to match character varying(255)
      allowNull: false,
      field: 'message' // Mapping the Sequelize field to the actual table column name
    },
    userId: { // Renamed from 'sender_id' to match the 'userId' column in the table
      type: DataTypes.INTEGER,
      allowNull: false
    },
    chatRoomId: { // Renamed from 'group_id' to match the 'chatRoomId' column in the table
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: { // Ensuring this matches the table, including using timestamp with time zone
      type: DataTypes.DATE, // Sequelize will map this to timestamp with time zone
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: { // Added this to match the table schema
      type: DataTypes.DATE, // Sequelize will map this to timestamp with time zone
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Message',
    timestamps: true, // Enables automatic handling of createdAt and updatedAt by Sequelize
    // Since the fields match the default Sequelize behavior, custom fields are not necessary
  });

  return Message;
};

