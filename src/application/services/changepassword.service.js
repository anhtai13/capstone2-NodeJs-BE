import ChangePasswordController from "../controllers/changepassword.controller.js";

const changePassword = (params, callback) => {
  ChangePasswordController.changePassword(params, (err, result) => {
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
