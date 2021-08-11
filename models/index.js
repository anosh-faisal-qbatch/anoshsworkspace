const { result } = require("lodash");
const sequelize = require("../databaseConnection");
const Albums = require("./albums");
const Posts = require("./posts");
const PhotosUrl = require("./photos");
const UserTable = require("./userTable");
const ToDo = require("./todo");
const Comments = require("./comments");

//UserData.hasMany(Albums);
UserTable.hasMany(ToDo);
UserTable.hasMany(Posts);
UserTable.hasMany(Albums);
Posts.hasMany(Comments);
Albums.hasMany(PhotosUrl);

sequelize

  .sync({ force: true })
  .then((res) => {
    console.log(res);
  })

  .catch((err) => {
    console.log(err);
  });
