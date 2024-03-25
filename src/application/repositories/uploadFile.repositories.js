import getConnection from "../../config/connection.database.js";

const Connection = getConnection();
const saveFiles = async (file) => {
  const sql = `INSERT INTO services (image) VALUES ( ?)`;
  const values = [file.filename];

  return await new Promise((resolve, reject) => {
    Connection.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }).catch((error) => {
    console.log(error);
    console.log("bug seve")
  });
};

export default {
  saveFiles
};
