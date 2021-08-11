const Sequelize = require("sequelize");
const sequelize = require("../databaseConnection");

const PostsData = sequelize.define(
  "posts_data",
  {
    user_table_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

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
  },
  {
    underscored: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);
module.exports = PostsData;
