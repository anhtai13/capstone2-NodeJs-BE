import getConnection from "../../config/connection.database.js";
import bcrypt from "bcryptjs";

const connection = getConnection();
let limitDefault = 5;
let offsetDefault = 0;
let salt = bcrypt.genSaltSync(10);

const searchUsers = (params, callback) => {
  if (params.limit && params.offset) {
    limitDefault = params.limit;
    offsetDefault = params.offset;
    if (params.name) {
      const safeParam = params.name.replace("'", "\\'");
      connection.query(
        `SELECT * FROM users WHERE username LIKE '%${safeParam}%' LIMIT ${limitDefault} OFFSET ${offsetDefault}`,
        (error, results) => {
          if (error) {
            callback({ message: "Something wrong!" }, null);
          } else if (results.length == 0) {
            callback({ message: "User not found" }, null);
          } else {
            callback(null, results);
          }
        }
      );
    }
    // } else if (params.sortName) {
    //     connection.query(
    //       `SELECT * FROM users order by username ${params.sortName} LIMIT ${limitDefault} OFFSET ${offsetDefault}`,
    //       (error, results) => {
    //         if (error) {
    //           callback({ message: "Something wrong!" }, null);
    //         } else if (results.length == 0) {
    //           callback({ message: "User not found" }, null);
    //         } else {
    //           callback(null, results);
    //         }
    //       }
    //     );
    //   } else if (params.sortRole) {
    //     connection.query(
    //       `SELECT * FROM users order by role ${params.sortRole} LIMIT ${limitDefault} OFFSET ${offsetDefault}`,
    //       (error, results) => {
    //         if (error) {
    //           callback({ message: "Something wrong!" }, null);
    //         } else if (results.length == 0) {
    //           callback({ message: "User not found" }, null);
    //         } else {
    //           callback(null, results);
    //         }
    //       }
    //     );
    //   } else if (params.sortLastName) {
    // connection.query(
    //   `SELECT * FROM users order by role ${params.sortLastName} LIMIT ${limitDefault} OFFSET ${offsetDefault}`,
    //   (error, results) => {
    //     if (error) {
    //       callback({ message: "Something wrong!" }, null);
    //     } else if (results.length == 0) {
    //       callback({ message: "User not found" }, null);
    //     } else {
    //       callback(null, results);
    //     }
    //   }
    // );
  } else {
    connection.query(`SELECT * FROM users`, (error, results) => {
      if (error) {
        callback({ message: "Something wrong1!" }, null);
      } else {
        callback(null, results);
      }
    });
  }
};

const addUser = (params, callback) => {
  const hashedPassword = bcrypt.hashSync(params.password, salt);
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [params.email],
    (err, emailResults) => {
      if (err) {
        callback({ message: "Something went wrong!" }, null);
      } else if (emailResults.length > 0) {
        callback({ message: "Email already exists" }, null);
      } else {
        connection.query(
          "INSERT INTO users (username,email,password,first_name,last_name,role,avatar,created_at,updated_at,created_by_id,updated_by_id,api_key,status,address_user,phone_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            params.username,
            params.email,
            hashedPassword,
            params.first_name,
            params.last_name,
            params.role,
            params.avatar,
            new Date().toISOString().slice(0, 19).replace("T", " "),
            new Date().toString(),
            params.created_by_id,
            params.updated_by_id,
            null,
            params.status,
            params.address_user,
            params.phone_number,
            // params.employee_code,
          ],
          (err, results) => {
            if (err) {
              callback({ message: "Something went wrong!" }, null);
            } else {
              callback(null, results, { message: "Successful!" });
            }
          }
        );
      }
    }
  );
};


const getDetailUser = (params, callback) => {
  connection.query(
    `SELECT * FROM users WHERE user_id=?`,
    [params.id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "User not found" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const updateUser = async (params, callback) => {
  const hashedPassword = bcrypt.hashSync(params.userUpdate.password, salt);
  connection.query(
    `SELECT * FROM users WHERE user_id=?`,
    [params.id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "User not found" }, null);
      } else if (params.userUpdate.password.length < 1) {
        connection.query(
          "update users set username=? , email=? , first_name=? , last_name=? , role=? , avatar=? , address_user=? , phone_number=? ,created_at=? , updated_at=? , created_by_id=? , updated_by_id=?  where user_id=?",
          [
            params.userUpdate.username,
            params.userUpdate.email,
            params.userUpdate.first_name,
            params.userUpdate.last_name,
            params.userUpdate.role,
            params.userUpdate.avatar,
            params.userUpdate.address_user,
            params.userUpdate.phone_number,
            params.userUpdate.created_at,
            params.userUpdate.updated_at,
            params.userUpdate.created_by_id,
            params.userUpdate.updated_by_id,
            params.id,
          ],
          (err, results) => {
            if (err) {
              callback({ message: "Có lỗi xảy raaaaaaaaaaaaaaaaaa!" }, null);
            } else {
              callback(null, results);
            }
          }
        );
      } else {
        connection.query(
          "UPDATE users SET username=?,email=?,password=?,first_name=?,last_name=?,role=?,avatar=?,address_user=?,phone_number=?,created_at=?,updated_at=?,created_by_id=?,updated_by_id=?  WHERE user_id=?",
          [
            params.userUpdate.username,
            params.userUpdate.email,
            hashedPassword,
            params.userUpdate.first_name,
            params.userUpdate.last_name,
            params.userUpdate.role,
            params.userUpdate.avatar,
            params.userUpdate.address_user,
            params.userUpdate.phone_number,
            params.userUpdate.created_at,
            params.userUpdate.updated_at,
            params.userUpdate.created_by_id,
            params.userUpdate.updated_by_id,
            params.id,
          ],
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

const deleteUser = (params, callback) => {
  connection.query(
    `SELECT * FROM users WHERE user_id=?`,
    [params.id],
    (error, results, fields) => {
      if (error) {
        callback({ message: "Something wrong!" }, null);
      } else if (results.length == 0) {
        callback({ message: "User not found" }, null);
      } else {
        connection.query(
          "delete from users where user_id=?",
          [params.id],
          (err, results) => {
            if (err) {
              callback(
                {
                  message:
                    "User has orders. Please delete orders of this user first!",
                },
                null
              );
            } else {
              callback(null, results, { message: "delete user success" });
            }
          }
        );
      }
    }
  );
};


const updateInformationCustomer = (id, userData, callback) => {
  console.log("Updating user with ID in repository:", id);
  console.log("New user data in repository:", userData);

  connection.query(
    `UPDATE users SET first_name=?, last_name=?, phone_number=?, address_user=? WHERE user_id=?`,
    [userData.first_name, userData.last_name, userData.phone_number, userData.address_user, id],
    (error, results, fields) => {
      if (error) {
        console.error("Error updating user in repository:", error.message);
        callback({ message: "Something went wrong while updating user" }, null);
      } else {
        console.log("User updated successfully in repository");
        callback(null, results);
      }
    }
  );
};


export default {
  searchUsers,
  addUser,
  getDetailUser,
  updateUser,
  deleteUser,
  updateInformationCustomer,
};
