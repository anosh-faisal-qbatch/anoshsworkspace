const { compact, get } = require("lodash");
const Albums = require("./models/albums");
const PostsData = require("./models/posts");
const Photos = require("./models/photos");
const Comments = require("./models/comments");
const ToDo = require("./models/todo");
const Users = require("./models/userTable");

const _ = require("lodash");
const fetch = require("node-fetch");
const prompt = require("prompt-sync")();

const { stdin: input, stdout: output } = process;
const { createInterface } = require("readline");
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
async function getDataPostUser() {
  var p1 = fetch("https://jsonplaceholder.typicode.com/users").then(
    (response) => (comments = response.json())
  );
  var p2 = fetch("https://jsonplaceholder.typicode.com/posts").then(
    (response) => {
      return response.json();
    },
    100
  );

  const rows = await Promise.all([p1, p2]);
  let userName = await takeInput("Enter name to get required user post : ");

  const filterUser = _.filter(rows[0], function (o) {
    return o.name == userName;
  });
  const mappedValue = _.map(filterUser, function (x) {
    return x.id;
  });
  const filterAllPost = _.filter(rows[1], function (o) {
    return o.userId == mappedValue;
  });

  //Database Work
  const arrobj = filterAllPost.map(function (i) {
    return { user_table_id: i.userId, id: i.id, title: i.title, body: i.body };
  });

  await PostsData.bulkCreate(arrobj);

  const result = await PostsData.findAll({ where: { id: mappedValue } });
  console.log(result);
  // console.log(result);
  //const arr2 = PostsData.findAll({ group: "id" });
  //console.log(arrobj);

  // console.log(arr2);
}
//find titles albums with specific street of user:'

async function getDataByStreet() {
  var p1 = fetch("https://jsonplaceholder.typicode.com/users").then(
    (response) => (comments = response.json())
  );

  var p2 = fetch("https://jsonplaceholder.typicode.com/albums").then(
    (response) => {
      return response.json();
    },
    100
  );

  const rows = await Promise.all([p1, p2]);

  let n = await takeInput("Enter Street to get required data: ");
  const filterStreetData = _.filter(rows[0], function (o) {
    return o.address.street == n;
  });
  const mappedArray = _.map(filterStreetData, function (x) {
    return x.id;
  });
  const filterAlbumsData = _.filter(rows[1], function (o2) {
    return o2.id == mappedArray;
  });
  console.log(filterAlbumsData);
  //Database Work
  await Albums.create({
    user_id: filterAlbumsData[0].userId,
    id: filterAlbumsData[0].id,
    title: filterAlbumsData[0].title,
  });
}

//find top 10 thumbnails specific zipcode of user

async function getZipCodeData() {
  var p3 = fetch("https://jsonplaceholder.typicode.com/users").then(
    (response) => {
      return response.json();
    },
    100
  );

  var p4 = fetch("https://jsonplaceholder.typicode.com/albums").then(
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
  const rows2 = await Promise.all([p3, p4, p5]);
  let n = await takeInput("Enter ZipCode to get required data ");
  const filterZipCodeData = _.filter(rows2[0], function (o) {
    return o.address.zipcode == n;
  });
  const getId = _.map(filterZipCodeData, function (x) {
    return x.id;
  });
  const filterAlbumsData = _.filter(rows2[1], function (o2) {
    return o2.userId == getId;
  });
  const getThumbNail = _.filter(rows2[2], function (x) {
    return x.albumId == getId;
  });
  const size = 10;
  const printFinalResult = getThumbNail.slice(0, size); //slice to get top 10 users data
  //Database Work

  const arr = printFinalResult.map(function (n) {
    return {
      album_id: n.albumId,
      id: n.id,
      title: n.title,
      url: n.url,
      thumbnail_url: n.thumbnailUrl,
    };
  });

  Photos.bulkCreate(arr);
  console.log(arr);
}

async function choiceFunction() {
  console.log("Enter  1 to get post of specific user ");
  console.log("Enter 2 to get titles albums with specific street of user");
  console.log("Enter 3 to get top 10 thumbnails specific zipcode of user  ");

  while (true) {
    let selectFrom = await takeInput("Enter your choice: ");
    selectFrom = Number(selectFrom);
    if (selectFrom == 0) {
      break;
    }
    switch (selectFrom) {
      case 1:
        await getDataPostUser();
        break;

      case 2:
        await getDataByStreet();
        break;
      case 3:
        await getZipCodeData();
        break;
      default:
        console.log("Invalid Input !!!");
    }
  }
}

choiceFunction();
