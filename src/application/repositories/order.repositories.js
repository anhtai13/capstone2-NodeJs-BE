import getConnection from "../../config/connection.database.js";
import { randomString } from "../../utils/randomString.js";

const connection = getConnection();

const getListOrder = (params, callback) => {
  connection.query(
    `SELECT *, FORMAT(order_details.unit_price, 0) AS unit_price
     FROM orders
     INNER JOIN order_details ON orders.order_id = order_details.order_id`,
    (error, results) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};


const getListOrderByEmployeeCode = (employeeCode, callback) => {
  connection.query(
    `SELECT orders.*, order_details.*,FORMAT(order_details.unit_price, 0) AS unit_price
     FROM orders
     INNER JOIN order_details ON orders.order_id = order_details.order_id
     INNER JOIN users ON order_details.employee_code = users.employee_code
     WHERE users.employee_code = ?`,
    [employeeCode],
    (error, results) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const getListOrderByDateRepository = (workDate, employeeCode, callback) => {
  connection.query(
    `SELECT * FROM orders
     INNER JOIN order_details ON orders.order_id = order_details.order_id
     WHERE order_details.work_date = ? AND order_details.employee_code = ?`,
    [workDate, employeeCode],
    (error, results) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};


const getOrderTotalPrice = (params, callback) => {
  if (params != "-1") {
    connection.query(
      `SELECT *, SUM(sub_total_price) AS total_price_user FROM order_details left join orders on orders.order_id=order_details.order_id where orders.user_id=? group by orders.user_id;`,
      [params],
      (error, results) => {
        if (error) {
          callback(
            { message: "Your order is empty. Please try to order something!" },
            null
          );
        } else {
          callback(null, results);
        }
      }
    );
  } else {
    connection.query(
      `SELECT *, SUM(sub_total_price) AS total_price_user FROM order_details left join orders on orders.order_id=order_details.order_id group by orders.user_id;`,
      (error, results) => {
        if (error) {
          callback(
            { message: "Your order is empty. Please try to order something!" },
            null
          );
        } else {
          callback(null, results);
        }
      }
    );
  }
};

const addOrder = (params, callback) => {
  const randomNumber = Math.floor(Math.random() * 10000000000);
  const serialNumber = randomNumber.toString().padStart(5, '0');
  connection.query(
    `SELECT user_id FROM users`,
    (userError, userResults) => {
      if (userError) {
        console.log(userError);
        callback({ message: "Error fetching user information" }, null);
        return;
      }
      if (userResults.length === 0) {
        callback({ message: "User not found" }, null);
        return;
      }
      const user_id = params.user_id;
      const status_id = 1;
      connection.query(
        `INSERT INTO orders (serial_number, user_id, order_at, total_price, status_id, created_at, created_by_id, txn_ref, amount, order_infor, status, vnp_ResponseCode, notification) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          serialNumber,
          user_id,
          new Date(),
          params.total_price,
          status_id,
          new Date(),
          params.created_by_id,
          params.txn_ref,
          params.amount,
          params.order_infor,
          params.status,
          params.vnp_ResponseCode,
          params.notification,
        ],
        (orderError, orderResults) => {
          if (orderError) {
            console.log(orderError);
            callback({ message: "Error inserting order" }, null);
            return;
          }
          const lastIdInsert = orderResults.insertId;
          const formattedWorkDate = params.work_date.split('/').reverse().join('-');
          connection.query(
            `INSERT INTO order_details (order_id, phone_number, service_id, note, unit_price, sub_total_price, address_order, area, work_date, start_time, full_name, housetype, service_name, estimated_time, vnp_ResponseCode, payment, status_payment, notification) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              lastIdInsert,
              params.phone_number,
              params.service_id,
              params.note,
              params.unit_price,
              params.sub_total_price,
              params.address_order,
              params.area,
              formattedWorkDate,
              params.start_time,
              params.full_name,
              params.housetype,
              params.service_name,
              params.estimated_time,
              params.vnp_ResponseCode,
              params.payment,
              params.status_payment,
              params.notification,
            ],
            (detailError, detailResults) => {
              if (detailError) {
                console.log(detailError);
                callback({ message: "Error inserting order details" }, null);
                return;
              }
              callback(null, { message: "Successfully ordered!" });
            }
          );
        }
      );
    }
  );
};


// const addOrder = (params, callback) => {
//   const randomNumber = Math.floor(Math.random() * 10000000000);
//   const serialNumber = randomNumber.toString().padStart(5, '0');

//   connection.query(
//     `SELECT user_id FROM users WHERE user_id = ?`,
//     [params.user_id],
//     (userError, userResults) => {
//       if (userError) {
//         console.log(userError);
//         callback({ message: "Error fetching user information" }, null);
//         return;
//       }
//       if (userResults.length === 0) {
//         callback({ message: "User not found" }, null);
//         return;
//       }
//       const user_id = params.user_id;
//       const status_id = 1;

//       connection.query(
//         `INSERT INTO orders (serial_number, user_id, order_at, total_price, status_id, created_at, created_by_id, txn_ref, amount, order_infor, status, vnp_ResponseCode, notification) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//          INSERT INTO order_details (order_id, phone_number, service_id, note, unit_price, sub_total_price, address_order, area, work_date, start_time, full_name, housetype, service_name, estimated_time, vnp_ResponseCode, payment, status_payment, notification)
//          VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
//         [
//           serialNumber,
//           user_id,
//           new Date(),
//           params.total_price,
//           status_id,
//           new Date(),
//           params.created_by_id,
//           params.txn_ref,
//           params.amount,
//           params.order_infor,
//           params.status,
//           params.vnp_ResponseCode,
//           params.notification,
//           // Order details values
//           params.phone_number,
//           params.service_id,
//           params.note,
//           params.unit_price,
//           params.sub_total_price,
//           params.address_order,
//           params.area,
//           params.work_date.split('/').reverse().join('-'), // formatted work date
//           params.start_time,
//           params.full_name,
//           params.housetype,
//           params.service_name,
//           params.estimated_time,
//           params.vnp_ResponseCode,
//           params.payment,
//           params.status_payment,
//           params.notification,
//         ],
//         (error, results) => {
//           if (error) {
//             console.log(error);
//             callback({ message: "Error inserting order and order details" }, null);
//             return;
//           }
//           callback(null, { message: "Successfully ordered!" });
//         }
//       );
//     }
//   );
// }


const addOrderDetails = (params, callback) => {
  connection.query('insert into order_details SET ?', params, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      if (results.affectedRows > 0) {
        callback(null, { message: 'Order details added successfully!' });
      } else {
        callback({ message: 'Failed to add order details' }, null);
      }
    }
  });
};


const getDetailOrder = (params, callback) => {
  connection.query(
    `SELECT orders.*, users.username, users.email, users.first_name, users.last_name FROM orders LEFT JOIN users ON orders.user_id = users.user_id WHERE orders.user_id = ?`,
    [+params.id],
    (error, results, fields) => {
      if (error) {
        console.log(error);
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback(null, results);
      } else {
        callback(null, results);
      }
    }
  );
};

const getDetailOrderByUserId = (params, callback) => {
  connection.query(
    `SELECT od.*,o.*,s.*,u.* 
    FROM order_details
    AS od JOIN orders
    AS o ON od.order_id = o.order_id JOIN services 
    AS s ON od.service_id = s.service_id JOIN users 
    AS u ON o.user_id = u.user_id`,
    [+params.user_id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Orders not found!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
}


const updateOrder = (params, callback) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().replace('T', ' ').replace(/\.\d{3}Z/, '');
  connection.query(
    `SELECT od.*, o.*, s.*, u.* 
     FROM order_details AS od 
     JOIN orders AS o ON od.order_id = o.order_id 
     JOIN services AS s ON od.service_id = s.service_id 
     JOIN users AS u ON o.user_id = u.user_id
     WHERE o.order_id = ?`,
    [params.order_id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length === 0) {
        callback({ message: "Order not found!" }, null);
      } else {
        connection.query(
          `UPDATE orders AS o JOIN order_details AS od ON o.order_id = od.order_id SET o.order_at=?,o.status_id=?,o.created_at=?,od.employee_code=? WHERE o.order_id = ?`,
          [
            formattedDate,
            params.status_id,
            formattedDate,
            params.employee_code,
            params.order_id,
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

const deleteOrder = (params, callback) => {
  connection.query(
    `SELECT * FROM orders WHERE order_id=?`,
    [params.id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Order not found!" }, null);
      } else {
        connection.query(
          `DELETE FROM order_details WHERE order_id=?`,
          [params.id],
          (err, results) => {
            if (err) {
              callback({ message: "Something wrong!" }, null);
            } else {
              connection.query(
                `DELETE FROM orders WHERE order_id=?`,
                [params.id],
                (err, results) => {
                  if (err) {
                    console.log(err);
                    callback({ message: "Something wrong!" }, null);
                  } else {
                    callback(null, { message: "Delete successful!" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

const getStatusIdByEmployeeCodeRepository = (employeeCode, callback) => {
  connection.query(
    `SELECT employee_code FROM order_details WHERE employee_code = ? LIMIT 1`,
    [employeeCode],
    (error, results) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else {
        if (results.length > 0) {
          // Nếu tồn tại employee_code trong bảng order_details
          const statusId = (employeeCode === 0) ? 1 : 2; // status_id sẽ là 1 nếu employee_code == 0, ngược lại là 2
          callback(null, { status_id: statusId });
        } else {
          // Nếu không tồn tại employee_code trong bảng order_details
          callback({ message: "Employee code not found!" }, null);
        }
      }
    }
  );
};

export default {
  getListOrder,
  addOrder,
  getDetailOrder,
  updateOrder,
  deleteOrder,
  getOrderTotalPrice,
  getDetailOrderByUserId,
  addOrderDetails,
  getListOrderByEmployeeCode,
  getListOrderByDateRepository,
  getStatusIdByEmployeeCodeRepository,
};
