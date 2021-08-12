const { result } = require("lodash");
const sequelize = require("../databaseConnection");
const Albums = require("./albums");
const PhotosUrl = require("./photos");
const Users = require("./users");
const ToDo = require("./todo");
const Comments = require("./comments");
const Posts = require("./posts");

Users.hasMany(ToDo);
ToDo.belongsTo(Users, { foreignKey: "user_id" });
Users.hasMany(Posts);
Posts.belongsTo(Users, { foreignKey: "user_id" });
Users.hasMany(Albums);
Albums.hasMany(PhotosUrl);

sequelize

  .sync()

  .then((res) => {
    // console.log(res);
  })

  .catch((err) => {
    console.log(err);
  });
