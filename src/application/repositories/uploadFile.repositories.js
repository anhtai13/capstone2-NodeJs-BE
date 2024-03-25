import getConnection from "../../config/connection.database.js";

const Connection = getConnection();
const saveFiles = async (service) => {
  const sql = `INSERT INTO services (description, name_service, unit_price, created_at, created_by_id, updated_at, updated_by_id, image, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [service.description, service.name_service, service.unit_price, service.created_at, service.created_by_id, service.updated_at, service.updated_by_id, service.image, service.category_id];

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
  });
};

export default {
  saveFiles
};