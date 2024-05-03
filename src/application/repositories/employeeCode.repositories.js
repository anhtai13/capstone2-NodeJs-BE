import getConnection from "../../config/connection.database.js";

const connection = getConnection();

const getListEmployeeAndOrder = (params, callback) => {
  connection.query(
    `SELECT u.*, od.* FROM order_details od JOIN users u ON od.employee_code = u.user_id WHERE od.responeCode IS NULL AND u.role = 3`,
    [params],
    (error, results) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

export default { getListEmployeeAndOrder };
