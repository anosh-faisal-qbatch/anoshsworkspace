const Sequelize = require("sequelize");
const sequelize = require("../databaseConnection");

const Users = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    address: {
      type: Sequelize.JSON,
      allowNull: false,
    },

    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    website: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    company: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  },
  {
    underscored: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = Users;
