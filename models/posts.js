const Sequelize = require("sequelize");
const sequelize = require("../databaseConnection");

const PostsData = sequelize.define(
  "posts",
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

    body: {
      type: Sequelize.STRING,
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
module.exports = PostsData;
