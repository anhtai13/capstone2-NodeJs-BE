import getConnection from "../../config/connection.database.js";
import bcrypt from "bcryptjs";
import { randomString } from "../../utils/randomString.js";

const connection = getConnection();
const login = (params, callback) => {
  if (params.username === "" || params.password === "") {
    callback({ message: "Bạn hãy nhập đầy đủ thông tin để đăng nhập" }, null);
    return;
  }
  if (params.role == 1 || params.role == 2) {
    // Sửa điều kiện ở đây
    connection.query(
      "SELECT * FROM users WHERE username = ? AND (role = 1 OR role = 2)", // Sửa câu truy vấn
      [params.username],
      (error, results) => {
        if (error) {
          callback({ message: "Something went wrong!" }, null);
          return;
        }
        if (results.length === 0) {
          callback({ message: "Tên đăng nhập bị sai" }, null);
          return;
        }
        bcrypt.compare(
          params.password,
          results[0].password,
          (err, passwordMatch) => {
            if (passwordMatch) {
              const key = `${results[0].user_id}` + randomString(125);
              connection.query(
                "UPDATE users SET api_key = ? WHERE user_id = ?",
                [key, results[0].user_id],
                (err, updateResults) => {
                  if (err) {
                    console.log(err);
                    callback({ message: "Something went wrong!" }, null);
                    return;
                  }
                  callback(null, { key: key, id: results[0].user_id });
                }
              );
            } else {
              callback({ message: "Mật khẩu bị sai" }, null);
              return;
            }
          }
        );
      }
    );
  }

  if (params.role == 3) {
    connection.query(
      "SELECT * FROM users WHERE username = ?",
      [params.username],
      (error, results) => {
        if (error) {
          console.log(error);
          callback({ message: "Something went wrong!" }, null);
          return;
        }
        if (results.length === 0) {
          callback({ message: "Tên đăng nhập bị sai" }, null);
          return;
        }
        bcrypt.compare(
          params.password,
          results[0].password,
          (err, passwordMatch) => {
            if (passwordMatch) {
              const key = `${results[0].user_id}` + randomString(125);
              connection.query(
                "UPDATE users SET api_key = ? WHERE user_id = ?",
                [key, results[0].user_id],
                (err, updateResults) => {
                  if (err) {
                    console.log(err);
                    callback({ message: "Something went wrong!" }, null);
                    return;
                  }
                  callback(null, { key: key, id: results[0].user_id });
                }
              );
            } else {
              callback({ message: "Mật khẩu bị sai" }, null);
              return;
            }
          }
        );
      }
    );
  }

  if (params.role == 4) {
    connection.query(
      "SELECT * FROM users WHERE username = ?",
      [params.username],
      (error, results) => {
        if (error) {
          console.log(error);
          callback({ message: "Something went wrong!" }, null);
          return;
        }
        if (results.length === 0) {
          callback({ message: "Tên đăng nhập bị sai" }, null);
          return;
        }
        bcrypt.compare(
          params.password,
          results[0].password,
          (err, passwordMatch) => {
            if (passwordMatch) {
              const key = `${results[0].user_id}` + randomString(125);
              connection.query(
                "UPDATE users SET api_key = ? WHERE user_id = ?",
                [key, results[0].user_id],
                (err, updateResults) => {
                  if (err) {
                    console.log(err);
                    callback({ message: "Something went wrong!" }, null);
                    return;
                  }
                  callback(null, { key: key, id: results[0].user_id });
                }
              );
            } else {
              callback({ message: "Mật khẩu bị sai" }, null);
              return;
            }
          }
        );
      }
    );
  }
};

const login1 = (params, callback) => {
  if (params.username === "" || params.password === "") {
    callback({ message: "Bạn hãy nhập đầy đủ thông tin để đăng nhập" }, null);
    return;
  }

  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [params.username],
    (error, results) => {
      if (error) {
        console.log(error);
        callback({ message: "Something went wrong!" }, null);
        return;
      }
      if (results.length === 0) {
        callback({ message: "Tên đăng nhập bị sai" }, null);
        return;
      }
      bcrypt.compare(
        params.password,
        results[0].password,
        (err, passwordMatch) => {
          if (passwordMatch) {
            const key = `${results[0].user_id}` + randomString(125);
            connection.query(
              "UPDATE users SET api_key = ? WHERE user_id = ?",
              [key, results[0].user_id],
              (err, updateResults) => {
                if (err) {
                  console.log(err);
                  callback({ message: "Something went wrong!" }, null);
                  return;
                }
                callback(null, {
                  key: key,
                  id: results[0].user_id,
                  role: results[0].role,
                });
              }
            );
          } else {
            callback({ message: "Mật khẩu bị sai" }, null);
            return;
          }
        }
      );
    }
  );
};

const logout = (params, callback) => {
  connection.query(
    "UPDATE users SET api_key = null WHERE api_key = ?",
    [params.key.key],
    (error, results) => {
      if (error) {
        callback({ message: "Something went wrong!" }, null);
      } else {
        callback(null, "See you again!");
      }
    }
  );
};

export default {
  login,
  logout,
  // getUserById,
  // updatePassword,
  login1,
};
