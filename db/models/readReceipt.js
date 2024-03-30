const { Model, DataTypes } = require("sequelize");

class ReadReceipt extends Model {
  static associate(models) {
    // Adjust foreign keys to match the PostgreSQL table
    ReadReceipt.belongsTo(models.Message, { foreignKey: "messageId" }); // Adjust to 'messageId' to match the table
    ReadReceipt.belongsTo(models.User, { foreignKey: "userId" }); // Adjust to 'userId' to match the table
  }
}

module.exports = (sequelize) => {
  ReadReceipt.init(
    {
      // Sequelize automatically handles the id primary key
      messageId: {
        // Adjust to camelCase to match Sequelize conventions and the table structure
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        // Adjust to camelCase to match Sequelize conventions and the table structure
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      readAt: {
        // Assuming read_at maps to readAt, adjusting to camelCase for consistency
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Assuming you want to keep the default to the current timestamp
      },
      // Including createdAt and updatedAt to match the table structure
      createdAt: {
        type: DataTypes.DATE, // Sequelize maps this to 'timestamp with time zone'
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE, // Sequelize maps this to 'timestamp with time zone'
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ReadReceipt",
      timestamps: true, // Adjusted to true to automatically handle createdAt and updatedAt
      // Sequelize will automatically use the correct field names for createdAt and updatedAt
    }
  );

  return ReadReceipt;
};
