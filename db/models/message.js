const { Model, DataTypes } = require('sequelize');

class Message extends Model {
  static associate(models) {
    Message.belongsTo(models.User, { foreignKey: 'sender_id' });
    Message.belongsTo(models.ChatGroup, { foreignKey: 'group_id' });
  }
}

module.exports = (sequelize) => {
  Message.init({
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Message',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Message;
};

