const Sequelize = require("sequelize");
const sequelize = require("../databaseConnection");

const Comments = sequelize.define(
  "comments",
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

    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    body: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  
  },
  {
    underscored: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);
module.exports = Comments;
