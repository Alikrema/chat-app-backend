const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static associate(models) {
    // Assuming models.Message and models.ChatGroup are correctly defined elsewhere
    // and considering the table structure provided,
    // ensure foreign keys and relationships are correctly mapped in your models.
    User.hasMany(models.Message, { foreignKey: "userId" }); // Adjusted according to the foreign keys mentioned
    User.belongsToMany(models.ChatRoom, {
      through: "UserChatRoom",
      foreignKey: "userId",
    }); // Assuming 'userId' is the correct foreignKey
  }
}

module.exports = (sequelize) => {
  User.init(
    {
      // Adjusted the field to 'password' to match the table definition
      username: {
        type: DataTypes.STRING, // corresponds to character varying(255)
        allowNull: false,
        unique: true,
      },
      password: {
        // Changed from hashed_password to password
        type: DataTypes.STRING, // corresponds to character varying(255)
        allowNull: false,
      },
      createdAt: {
        // Aligns with the PostgreSQL column createdAt, Sequelize handles the casing
        type: DataTypes.DATE, // Sequelize will map this to timestamp with time zone
        allowNull: false,
        field: "createdAt", // Explicitly defining the field name to match the table's column name
      },
      updatedAt: {
        // Aligns with the PostgreSQL column updatedAt, Sequelize handles the casing
        type: DataTypes.DATE, // Sequelize will map this to timestamp with time zone
        allowNull: false,
        field: "updatedAt", // Explicitly defining the field name to match the table's column name
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true, // Enables automatic handling of createdAt and updatedAt
      tableName: "users",
    }
  );

  return User;
};
