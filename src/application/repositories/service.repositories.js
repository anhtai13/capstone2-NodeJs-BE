import getConnection from "../../config/connection.database.js";

const connection = getConnection();
let limitDefault = 5;
let offsetDefault = 0;
const searchServices = (params, callback) => {
  if (params.limit && params.offset) {
    limitDefault = params.limit;
    offsetDefault = params.offset;
    connection.query(
      `SELECT * FROM services LIMIT ${limitDefault} OFFSET ${offsetDefault}`,
      (error, results) => {
        if (error) {
          callback({ message: "Something wrong!" }, null);
        } else {
          callback(null, results);
        }
      }
    );
  } else {
    connection.query(`SELECT * FROM services`, (error, results) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else {
        callback(null, results);
      }
    });
  }
};

const getCategory = (params, callback) => {
  connection.query(`SELECT * FROM service_category`, (error, results) => {
    if (error) {
      callback({ message: "Something wrong!" }, null);
    } else {
      callback(null, results);
    }
  });
};

const getServiceByCategory = (params, callback) => {
  connection.query(
    `SELECT services.* FROM services 
    JOIN service_category ON services.category_id = service_category.category_id 
    WHERE service_category.category_name = ?`,
    [params.service_category],
    (error, results) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const addService = (params, callback) => {
  connection.query(
    "insert into services (description,name_service,unit_price,image,category_id,created_at,created_by_id,updated_at,updated_by_id) values (?,?,?,?,?,?,?,?,?)",
    [
      params.description,
      params.name,
      params.price,
      params.image,
      params.category_id,
      params.created_at,
      params.created_by_id,
      params.updated_at,
      params.created_by_id,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        callback({ message: "Something went wrong!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const getDetailService = (params, callback) => {
  connection.query(
    `SELECT * FROM services WHERE service_id=?`,
    [params.services_id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Product not found!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const updateService = (params, callback) => {
  console.log(params);
  connection.query(
    `SELECT * FROM services WHERE service_id=?`,
    [params.service_id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Service not found!" }, null);
      } else {
        connection.query(
          "update services set description=?,name_service=?,unit_price=?,image=?,category_id=?,created_at=?,created_by_id=?,updated_at=?,updated_by_id=? where service_id=?",
          [
            params.description,
            params.name,
            params.price,
            params.image,
            params.category_id,
            params.created_at,
            params.created_by_id,
            params.updated_at,
            params.updated_by_id,
            params.service_id,
          ],
          (err, results) => {
            if (err) {
              console.log(err);
              callback({ message: "Something wrong!" }, null);
            } else {
              callback(null, results);
            }
          }
        );
      }
    }
  );
};

const deleteService = (params, callback) => {
  connection.query(
    `SELECT * FROM services WHERE service_id=?`,
    [params.service_id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Product not found!" }, null);
      } else {
        connection.query(
          "delete from services where service_id=?",
          [params.service_id],
          (err, results) => {
            if (err) {
              callback({ message: "Something wrong!" }, null);
            } else {
              callback(null, results);
            }
          }
        );
      }
    }
  );
};

export default {
  searchServices,
  getCategory,
  getServiceByCategory,
  addService,
  getDetailService,
  updateService,
  deleteService,
};
