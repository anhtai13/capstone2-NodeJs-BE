import getConnection from "../../config/connection.database.js";
import { randomString } from "../../utils/randomString.js";

const connection = getConnection();

const getListOrder = (params, callback) => {
  connection.query(`SELECT * FROM order_details`, (error, results) => {
    if (error) {
      callback({ message: "Something wrong!" }, null);
    } else {
      callback(null, results);
    }
  });
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
  // Generate a random 10-digit serial number
  const randomNumber = Math.floor(Math.random() * 10000000000); // Ensures 10 digits
  const serialNumber = randomNumber.toString().padStart(10, '0'); // Pad with zeros if needed
  // const user_id = 1;
  // const status_id = 1;

  //add data vào bảng orders
  connection.query(
    `insert into orders (serial_number,user_id,order_at,total_price,status_id,created_at,created_by_id) values (?,?,?,?,?,?,?)`,
    [
      serialNumber,
      params.user_id,
      new Date(),
      params.total_price,
      params.status_id,
      new Date(),
      params.created_by_id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
        callback({ message: "Something wrong!" }, null);
      } else {
        //get id order mới thêm vào
        const lastIdInsert = results.insertId;
        // format ngày
        const formattedWorkDate = params.work_date.split('/').reverse().join('-');
        //lấy id order mới thêm vào insert vào bảng order_details
        connection.query(
          `insert into order_details (order_id,phone_number,service_id,note,unit_price,sub_total_price,address_order,area,work_date,start_time,full_name) values (?,?,?,?,?,?,?,?,?,?,?)`,
          [
            lastIdInsert,
            params.phone_number,
            params.service_id,
            params.note,
            params.unit_price,
            params.subTotalPrice,
            params.address_order,
            params.area,
            formattedWorkDate,
            params.start_time,
            params.full_name
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              callback({ message: "Something wrong!" }, null);
            } else {
              callback(null, { message: "Thành công đặt đơn hàng!" });
            }
          }
        );
      }
    }
  );
};


const getDetailOrder = (params, callback) => {
  connection.query(
    `SELECT laundry_booking.orders.*, users.username,users.email,users.first_name,users.last_name FROM laundry_booking.orders left join users on orders.user_id=users.user_id where orders.user_id=?`,
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

const getDetailOrderById = (params, callback) => {
  connection.query(
    `SELECT * FROM order_details WHERE order_id=?`,
    [+params.id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Order not found!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const updateOrder = (params, callback) => {
  connection.query(
    `SELECT * FROM orders WHERE order_id=?`,
    [params.order_id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "Order not found!" }, null);
      } else {
        connection.query(
          `UPDATE orders SET serial_number=?,user_id=?,order_at=?,total_price=?,status_id=?,created_at=?,created_by_id=?,code=? WHERE order_id=?`,
          [
            params.serial_number,
            params.user_id,
            new Date().toString(),
            params.total_price,
            params.status_id,
            new Date().toString(),
            params.created_by_id,
            "",
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

export default {
  getListOrder,
  addOrder,
  getDetailOrder,
  updateOrder,
  deleteOrder,
  getOrderTotalPrice,
  getDetailOrderById,
};
