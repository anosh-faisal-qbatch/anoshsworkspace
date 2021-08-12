const { compact, get } = require("lodash");
const { Op, literal } = require("sequelize");
const Albums = require("./models/albums");
const Posts = require("./models/posts");
const Photos = require("./models/photos");
const Comments = require("./models/comments");
require("./models/index");
const ToDo = require("./models/todo");
const Users = require("./models/users");
const _ = require("lodash");
const fetch = require("node-fetch");
const prompt = require("prompt-sync")();

const { stdin: input, stdout: output } = process;
const { createInterface } = require("readline");
const UserTable = require("./models/users");
const { runInNewContext } = require("vm");
const { title } = require("process");
const PostsData = require("./models/posts");
const takeInput = (prompt) => {
  const rl = createInterface({ input, output });
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};

//find posts of specific user
async function getDataOfAll() {
  var p1 = fetch("https://jsonplaceholder.typicode.com/users").then(
    (response) => (comments = response.json())
  );

  var p2 = fetch("https://jsonplaceholder.typicode.com/todos").then(
    (response) => {
      return response.json();
    },
    100
  );
  var p3 = fetch("https://jsonplaceholder.typicode.com/albums").then(
    (response) => {
      return response.json();
    },

    100
  );

  var p4 = fetch("https://jsonplaceholder.typicode.com/posts").then(
    (response) => {
      return response.json();
    },
    100
  );

  var p5 = fetch("https://jsonplaceholder.typicode.com/photos").then(
    (response) => {
      return response.json();
    },
    100
  );
  var p6 = fetch("https://jsonplaceholder.typicode.com/comments").then(
    (response) => {
      return response.json();
    },
    100
  );

  const rows = await Promise.all([p1, p2, p3, p4, p5, p6]);
  //sending data of users to databse
  const arrobj1 = rows[0].map(function (i) {
    return {
      name: i.name,
      user_name: i.username,
      email: i.email,
      address: i.address,
      phone: i.phone,
      website: i.website,

      company: i.company,
    };
  });
  await Users.bulkCreate(arrobj1);

  //sending data of todos to database

  const arrobj = rows[1].map(function (i) {
    return { title: i.title, completed: i.completed, user_id: i.userId };
  });

  await ToDo.bulkCreate(arrobj);

  //sending data of albums to database
  const arrobj3 = rows[2].map(function (i) {
    return { title: i.title, user_id: i.userId };
  });

  await Albums.bulkCreate(arrobj3);

  //sending posts data to databse
  const arrobj4 = rows[3].map(function (i) {
    return { title: i.title, body: i.body, user_id: i.userId };
  });

  await Posts.bulkCreate(arrobj4);

  //sending photos data to database
  const arrobj5 = rows[4].map(function (i) {
    return {
      title: i.title,
      url: i.url,
      thumbnail_url: i.thumbnailUrl,
      album_title_id: i.albumId,
    };
  });
  await Photos.bulkCreate(arrobj5);

  //sending comments data to database

  /*const arrobj6 = rows[5].map(function (i) {
    return {
      name: i.name,
      email: i.email,
      body: i.body,
      posts_datum_id: i.postId,
    };
  });

  await Comments.bulkCreate(arrobj6); */

  /*const result = await PostsData.findAll({ where: { id: mappedValue } });
  // console.log(result); 
  console.log(result);
  //const arr2 = PostsData.findAll({ group: "id" });
  console.log(arrobj);*/
}

async function fetchPostDataFromDb() {
  /* const us = await Users.findAll({
    where: { id: 1 },
  });
  // console.log(JSON.stringify(us, null, 2)); */

  const postdata = await Posts.findAll({
    include: [
      {
        model: Users,
        where: { name: "Clementine Bauch" },
        right: true,
      },
    ],
  });

  // console.log(JSON.stringify(postdata, null, 2));
}

async function getDataByZipCode() {
  const userdata = await Users.findAll({
    attributes: ["address"],
    where: literal("JSON_EXTRACT(address, '$.zipcode') = '92998-3874'"),
  });

  console.log(JSON.stringify(userdata, null, 2));
}
//getDataOfAll();

getDataByZipCode();

//fetchPostDataFromDb();
