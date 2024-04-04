import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";

const env = process.env.NODE_ENV || "development";
const database = require("../../config/config.ts")[env];
// import db from '../config/config';

// const database =
//   env === 'development'
//     ? db.Development
//     : env === 'production'
//     ? db.Production
//     : env === 'testing'
//     ? db.Testing
//     : db.Development;

const sequelizeConnection = new Sequelize(
  database.database || "",
  database.username || "",
  database.password || "",
  {
    host: database.host || "",
    dialect: database.dialect,
  }
);

export default sequelizeConnection;
