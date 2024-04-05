import getConnection from "../../config/connection.database.js";
import bcrypt from "bcryptjs";

let salt = bcrypt.genSaltSync(10);
// Create reset password
const resetPassword = (formData, callback) => {
  const connection = getConnection();
  const hashedPassword = bcrypt.hashSync(formData.password, salt);

    connection.query(
      "UPDATE users SET password = ? WHERE email = ? ",
      [hashedPassword, formData.email],
      (err, updateResults) => {
        if (err) {
          console.log(err);
          return callback({ message: "Something went wrong!" }, null);
        }

        callback(null, { message: "Password reset successfully!" });
      }
    );
  };


export default {

  resetPassword
};
