import getConnection from "../../config/connection.database.js";

const Connection = getConnection();

// add service and upload file image to Services
const addService = async (service) => {
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

// edit service and upload file image to Services
const editService = async ( service) => {
  const sql = `UPDATE services SET description = ?, name_service = ?, unit_price = ?, created_at = ?, created_by_id = ?, updated_at = ?, updated_by_id = ?, image = ?, category_id = ? WHERE service_id = ?`;
  const values = [service.description, service.name_service, service.unit_price, service.created_at, service.created_by_id, service.updated_at, service.updated_by_id, service.image, service.category_id, service.id];

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
  addService,
  editService,

};