const Sequelize = require("sequelize");
const sequelize = require("../databaseConnection");

const AlbumTitles = sequelize.define(
  "albumTitle",
  {
    user_id: {
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
  },
  {
    underscored: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);
module.exports = AlbumTitles;
