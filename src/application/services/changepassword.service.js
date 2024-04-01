import ChangePasswordReponsitories from "../repositories/changepassword.repositories.js";
import bcrypt from "bcryptjs";

const changePassword = (params, callback) => {
  ChangePasswordReponsitories.changePassword(params, (err, result) => {
      if (err) {
          callback(err, null);
      } else {
          callback(null, result);
      }
  });
};

export default {
  changePassword,
};
