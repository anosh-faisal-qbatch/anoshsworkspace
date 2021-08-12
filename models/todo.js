const Sequelize = require("sequelize");
const sequelize = require("../databaseConnection");

const ToDo = sequelize.define(
  "toDo",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    underscored: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);
module.exports = ToDo;
