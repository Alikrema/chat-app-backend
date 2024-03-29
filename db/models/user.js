const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static associate(models) {
    User.hasMany(models.Message, { foreignKey: 'sender_id' });
    User.belongsToMany(models.ChatGroup, { through: 'UserChatGroup', foreignKey: 'user_id' });
  }
}

module.exports = (sequelize) => {
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return User;
};

