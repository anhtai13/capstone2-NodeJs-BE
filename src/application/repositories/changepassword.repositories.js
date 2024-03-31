import getConnection from "../../config/connection.database";

const connection = getConnection();
const changePassword = (params, callback) => {
  const { user_id, oldPassword, newPassword } = params;

  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    [user_id],
    (error, results) => {
      if (error) {
        console.log(error);
        callback({ message: "Something went wrong!" }, null);
      } else {
        if (results.length > 0) {
          const storedPassword = results[0].password;
          bcrypt.compare(oldPassword, storedPassword, (err, passwordMatch) => {
            if (passwordMatch) {
              bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                if (err) {
                  console.log(err);
                  callback({ message: "Error hashing password!" }, null);
                } else {
                  connection.query(
                    "UPDATE users SET password = ? WHERE user_id = ?",
                    [hashedPassword, user_id],
                    (err, updateResults) => {
                      if (err) {
                        console.log(err);
                        callback({ message: "Something went wrong!" }, null);
                      } else {
                        callback(null, { newPassword });
                      }
                    }
                  );
                }
              });
            } else {
              callback({ message: "Old password is incorrect" }, null);
            }
          });
        } else {
          callback({ message: "User not found" }, null);
        }
      }
    }
  );
};
export default {
  changePassword,
};
