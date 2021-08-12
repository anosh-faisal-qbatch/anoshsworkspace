const Sequelize = require("sequelize");

const sequelize = new Sequelize("apiData", "root", "anoshfaisal()L", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
try {
  sequelize.authenticate();
  // console.log("Connection Established....");
} catch (error) {
  // console.error("Unable to connect to db", error);
}

module.exports = sequelize;
