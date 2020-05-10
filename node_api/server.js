const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const db = require("./models");

const api = require("./routes/index");
//server.options('*', cors());
server.use(cors({ origin: "*" }));
// Parse request of content-type - application/json
server.use(bodyParser.json());
// parse requests of content-type -application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/", api);
// set listening ports for request
const port = process.env.PORT || 7070;

server.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
// Run following function if you want drop existing tables and re-sync database
// db.dropRestApiTable();
db.databaseConf.sync();
