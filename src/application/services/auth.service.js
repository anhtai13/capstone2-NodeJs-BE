import authRepositories from "../repositories/auth.repositories.js";
import bcrypt from "bcryptjs";

const login = (params, callback) => {
  authRepositories.login(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const logout = (params, callback) => {
  authRepositories.logout(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const login1 = (params, callback) => {
  authRepositories.login1(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

export default {
  login,
  logout,

  login1,
};
