import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const getConnection = () => {
  // Use process.env to access variables from the .env file
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
};

// const getConnection = () => {
//   return mysql.createConnection({
//     host: "127.0.0.1",
//     port: 3306,
//     user: "root",
//     password: "123456",
//     database: "clean_house_services",
//   });
// };

// const getConnection = () => {
//   return mysql.createConnection({
//     host: "127.0.0.1",
//     port: 3306,
//     user: "root",
//     password: "dat1201@",
//     database: "cleanhouseservices",
//   });
// };

export default getConnection;
