import getConnection from "../../config/connection.database.js";


const forgotPassword = (email, callback) => {
  const connection = getConnection();
  const query = "SELECT * FROM users WHERE email = ? ";
  
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.log(error);
      return callback({ message: "Something went wrong!" }, null);
    }

    if (!results.length) {
      console.log(results.length)
      return callback({ message: "User not found" }, null);
    }

   // Kiểm tra role sau khi lấy được kết quả
    const userRole = results[0].role;
    if (userRole === 1 || userRole === 2) {
      // Nếu role là 1 hoặc 2, tiếp tục xử lý
      callback(null,{ email: results[0].email });
    } else {
      // Nếu không phải, trả về thông báo lỗi
      return callback({ message: "Only admins and managers can reset password" }, null);
    }
  });
};



export default {
  forgotPassword
};
