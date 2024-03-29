const { Model, DataTypes } = require('sequelize');

class ReadReceipt extends Model {
  static associate(models) {
    ReadReceipt.belongsTo(models.Message, { foreignKey: 'message_id' });
    ReadReceipt.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

module.exports = (sequelize) => {
  ReadReceipt.init({
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    read_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'ReadReceipt',
    timestamps: false 
  });

  return ReadReceipt;
};

