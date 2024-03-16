import mysql from "mysql";

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
>>>>>>> dc908dd266830b3c694edac56d313f7940dbdf6f
  });
};

export default getConnection;
