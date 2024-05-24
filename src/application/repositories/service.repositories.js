import getConnection from "../../config/connection.database.js";

const connection = getConnection();
let limitDefault = 5;
let offsetDefault = 0;
const getListServices = (params, callback) => {
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

const searchServices = (params, callback) => {
  const keyword = params.keyword;
  const query = `SELECT * FROM services WHERE service_name LIKE '%${keyword}%'`;
  connection.query(query, (error, results) => {
    if (error) {
      callback({ message: "Something wrong!" }, null);
    } else {
      callback(null, results);
    }
  });
};

const searchOrderDetailsServices = (params, callback) => {
  const keyword = params.keyword;
  const employeeCode = params.employee_code;
  const query = `
      SELECT od.*, o.*
      FROM order_details od
      INNER JOIN orders o ON od.order_id = o.order_id
      INNER JOIN users u ON od.employee_code = u.employee_code
      WHERE (od.service_name LIKE '%${keyword}%' AND u.employee_code = '${employeeCode}')
  `;
  connection.query(query, (error, results) => {
    if (error) {
      callback({ message: "Something wrong!" }, null);
    } else {
      callback(null, results);
    }
  });
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
    "insert into services (description,service_name,unit_price,image,category_id,created_at,created_by_id,updated_at,updated_by_id) values (?,?,?,?,?,?,?,?,?)",
    [
      params.description,
      params.name,
      params.price,
      params.filename,
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
    [params.service_id],
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
          "update services set description=?,service_name=?,unit_price=?,image=?,category_id=?,created_at=?,created_by_id=?,updated_at=?,updated_by_id=? where service_id=?",
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
    [params.id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Product not found!" }, null);
      } else {
        connection.query(
          "delete from services where service_id=?",
          [params.id],
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

const updateOrderStatus = (orderId, callback) => {
  connection.query(
    "UPDATE orders SET status_id = 3 WHERE order_id = ?",
    [orderId],
    (error, results) => {
      if (error) {
        callback({ message: "Something went wrong while updating order status" }, null);
      } else {
        connection.query(
          "SELECT payment FROM order_details WHERE order_id = ?",
          [orderId],
          (error, paymentResult) => {
            if (error) {
              callback({ message: "Error retrieving payment method" }, null);
            } else {
              const paymentMethod = paymentResult[0].payment;
              if (paymentMethod === "Cash") {
                connection.query(
                  "UPDATE order_details SET status_payment = 'Successful Payment' WHERE order_id = ?",
                  [orderId],
                  (error, updateResult) => {
                    if (error) {
                      callback({ message: "Error updating payment status" }, null);
                    } else {
                      connection.query(
                        "SELECT status_id FROM orders WHERE order_id = ?",
                        [orderId],
                        (error, statusResult) => {
                          if (error) {
                            callback({ message: "Error retrieving updated status" }, null);
                          } else {
                            callback(null, statusResult[0].status_id);
                          }
                        }
                      );
                    }
                  }
                );
              } else {
                connection.query(
                  "SELECT status_id FROM orders WHERE order_id = ?",
                  [orderId],
                  (error, statusResult) => {
                    if (error) {
                      callback({ message: "Error retrieving updated status" }, null);
                    } else {
                      callback(null, statusResult[0].status_id);
                    }
                  }
                );
              }
            }
          }
        );
      }
    }
  );
};


export default {
  searchOrderDetailsServices,
  searchServices,
  getListServices,
  getCategory,
  getServiceByCategory,
  addService,
  getDetailService,
  updateService,
  deleteService,
  updateOrderStatus,
};
