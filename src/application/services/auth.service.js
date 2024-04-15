import authRepositories from "../repositories/auth.repositories.js";
import bcrypt from "bcryptjs";
import { sendOTPByEmail } from "../../utils/email.js";

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

const forgotPasswordApp = (email, otp, callback) => {
  authRepositories.forgotPasswordApp(email, otp, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      sendOTPByEmail(email, otp);
      const response = {
        message: "OTP sent successfully",
        OTP: otp
      };
      callback(null, response);
    }
  });
};

const verifyOTP = (email, otp, callback) => {
  authRepositories.verifyOTP(email, otp, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, "OTP verified successfully");
    }
  });
};

const changePasswordApp = (email, newPassword, callback) => {
  authRepositories.changePasswordApp(email, newPassword, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, "Password changed successfully");
    }
  });
};

const resendOTP = (email, otp, callback) => {
  authRepositories.saveResendOTP(email, otp, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      sendOTPByEmail(email, otp);
      const response = {
        message: "OTP resent successfully",
        OTP: otp
      };
      callback(null, response);
    }
  });
};

export default {
  login,
  logout,
  login1,
  forgotPasswordApp,
  verifyOTP,
  changePasswordApp,
  resendOTP,
};
