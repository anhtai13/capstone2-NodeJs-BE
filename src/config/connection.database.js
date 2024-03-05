import mysql from "mysql2";

const getConnection = () => {
  return mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
<<<<<<< HEAD
    password: "password",
    database: "clean_house",
=======
    password: "123456",
    database: "clean_house_services",
>>>>>>> fd6edef47b61e2e216a192d55f629827e15d51dd
  });
};

export default getConnection;
