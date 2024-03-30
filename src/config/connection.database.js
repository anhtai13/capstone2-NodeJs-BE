import mysql from "mysql";

const getConnection = () => {
  return mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: "clean_house",
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
