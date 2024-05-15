import getConnection from "../../config/connection.database.js";
import moment from "moment";
const connection = getConnection();

const getListDebtHistory = (params, callback) => {
  connection.query(
    `SELECT dh.*,format((dh.price),0) as price ,u.first_name,u.last_name,u.email,u.address_user,u.phone_number
    FROM debt_history dh
    JOIN 
        order_details od ON dh.order_detail_id = od.order_detail_id
    JOIN 
        users u ON dh.user_id = u.user_id
    GROUP BY 
        dh.debt_history_id;`,
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

// // lấy danh sách các nhân viên có tổng tiền nợ
// const getListEmployeeReceipt = (params, callback) => {
//   connection.query(
//     `SELECT u.*, FORMAT(SUM(od.unit_price), 0) AS employee_debt
//     FROM emoloyee_debt ed
//     JOIN order_details od ON ed.order_detail_id = od.order_detail_id
//     JOIN users u ON od.employee_code = u.user_id
//     WHERE od.responeCode IS NULL AND u.role = 3
//     GROUP BY u.user_id`,
//     [params],
//     (error, results) => {
//       if (error) {
//         callback({ message: "Something wrong!" }, null);
//       } else {
//         callback(null, results);
//       }
//     }
//   );
// };

// lấy danh sách các nhân viên có tổng tiền nợ
const getListEmployeeReceipt = (params, callback) => {
  connection.query(
    `SELECT u.*,BANG_A.emoloyee_debt_id,BANG_A.order_detail_id, 
    FORMAT(COALESCE(BANG_A.sum_no, 0), 'C', 'vi-VN') AS sum_no, 
    FORMAT(COALESCE(BANG_B.sum_nhan, 0), 'C', 'vi-VN') AS sum_nhan, 
    FORMAT((COALESCE(BANG_A.sum_no, 0) - COALESCE(BANG_B.sum_nhan, 0)), 'C', 'vi-VN') as balance
FROM users u
LEFT JOIN
 (SELECT od.employee_code,ed.emoloyee_debt_id,ed.order_detail_id, SUM(od.unit_price) AS sum_no
 FROM emoloyee_debt ed
 JOIN order_details od ON ed.order_detail_id = od.order_detail_id
 WHERE od.responeCode IS NULL
 GROUP BY od.employee_code) AS BANG_A
 ON u.user_id = BANG_A.employee_code
LEFT JOIN
 (SELECT dh.user_id, SUM(dh.price) as sum_nhan
 FROM debt_history dh
 GROUP BY dh.user_id) AS BANG_B
 ON u.user_id = BANG_B.user_id
WHERE u.role = 3;
    `,
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
const getListEmployeeReceiptId = (params, callback) => {
  connection.query(
    `SELECT u.*,BANG_A.emoloyee_debt_id,BANG_A.order_detail_id, 
    FORMAT(COALESCE(BANG_A.sum_no, 0), 'C', 'vi-VN') AS sum_no, 
    FORMAT(COALESCE(BANG_B.sum_nhan, 0), 'C', 'vi-VN') AS sum_nhan, 
    FORMAT((COALESCE(BANG_A.sum_no, 0) - COALESCE(BANG_B.sum_nhan, 0)), 'C', 'vi-VN') as balance
  FROM users u
  LEFT JOIN
  (SELECT od.employee_code,ed.emoloyee_debt_id,ed.order_detail_id, SUM(od.unit_price) AS sum_no
  FROM emoloyee_debt ed
  JOIN order_details od ON ed.order_detail_id = od.order_detail_id
  WHERE od.responeCode IS NULL
  GROUP BY od.employee_code) AS BANG_A
  ON u.user_id = BANG_A.employee_code
  LEFT JOIN
  (SELECT dh.user_id, SUM(dh.price) as sum_nhan
  FROM debt_history dh
  GROUP BY dh.user_id) AS BANG_B
  ON u.user_id = BANG_B.user_id
  WHERE u.role = 3 and u.user_id =?`,
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
  const date = moment(params.repayment_at).format("YYYY-MM-DD HH:mm:ss");
  connection.query(
    `INSERT INTO debt_history (user_id, repayment_at, price, order_detail_id,employee_debt_id) VALUES (?, ?, ?, ?, ?)`,
    [
      params.id,
      date,
      params.total,
      params.order_detail_id,
      params.employee_debt_id,
    ],
    (error, results) => {
      if (error) {
        callback({ message: "Something wrong!", error }, null);
      } else {
        callback(null, { message: "Success!", results });
      }
    }
  );
};

export default {
  getListDebtHistory,
  getListEmployeeReceipt,
  AddEmployeeDebt,
  getListEmployeeReceiptId,
};
