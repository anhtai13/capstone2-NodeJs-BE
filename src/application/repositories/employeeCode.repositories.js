import getConnection from "../../config/connection.database.js";
import moment from "moment";
const connection = getConnection();

const getListDebtHistory = (params, callback) => {
  connection.query(
    `SELECT * from debt_history`,
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

// lấy danh sách các nhân viên có tổng tiền nợ
const getListEmployeeReceipt = (params, callback) => {
  connection.query(
    `SELECT u.*, FORMAT(SUM(od.unit_price), 0) AS employee_debt
    FROM emoloyee_debt ed
    JOIN order_details od ON ed.order_detail_id = od.order_detail_id
    JOIN users u ON od.employee_code = u.user_id
    WHERE od.responeCode IS NULL AND u.role = 3
    GROUP BY u.user_id`,
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
// receipt employee debt
const AddEmployeeDebt = (params, callback) => {
  const date = moment(params.repayment_at).format('YYYY-MM-DD HH:mm:ss');
  connection.query(
    `INSERT INTO debt_history (user_id, repayment_at, price) VALUES (?, ?, ?)`,
    [params.id, date, params.total],
    (error, results) => {
      if (error) {
        callback({ message: "Something wrong!" ,error }, null);
      } else {
        callback(null, { message: "Success!" ,results });
      }
    }
  );
};

export default { getListDebtHistory, getListEmployeeReceipt, AddEmployeeDebt };
