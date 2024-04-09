import getConnection from "../../config/connection.database.js";

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
  connection.query('insert into orders SET ?', params, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, { message: 'Order added successfully!' });
    }
  });
};



const getDetailOrder = (params, callback) => {
  connection.query(
    `SELECT * FROM orders WHERE user_id=?`,
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
