import authService from "../services/auth.service.js";
import { generateOTP } from "../../utils/otp.js";

const login = (req, res) => {
  const userLogin = req.body;
  authService.login(userLogin, (err, result) => {
    if (err) {
      res.status(500).send({
        errMessage: err.message,
      });
    } else {
      res.status(200).send(result);
    }
  });
};

const login1 = (req, res) => {
  const userLogin = req.body;
  authService.login1(userLogin, (err, result) => {
    if (err) {
      res.status(500).send({
        errMessage: err.message,
      });
    } else {
      res.status(200).send(result);
    }
  });
};

const logout = (req, res) => {
  const userLogout = req.body;
  authService.logout(userLogout, (err, result) => {
    if (err) {
      res.status(500).send({
        errMessage: err.message,
      });
    } else {
      res.status(200).send(result);
    }
  });
};

const forgotPasswordApp = (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  authService.forgotPasswordApp(email, otp, (err, result) => {
    if (err) {
      res.status(500).send({
        errMessage: err.message,
      });
    } else {
      res.status(200).send(result);
    }
  });
};

const changePasswordForgotApp = (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).send({
      errMessage: "New password and confirm password do not match",
    });
  }

  authService.verifyOTP(email, otp, (err, result) => {
    if (err) {
      return res.status(500).send({
        errMessage: err.message,
      });
    }

    authService.changePasswordApp(email, newPassword, (err, result) => {
      if (err) {
        return res.status(500).send({
          errMessage: err.message,
        });
      }

      res.status(200).send({
        message: "Password changed successfully",
      });
    });
  });
};

export default {
  login,
  logout,
  login1,
  forgotPasswordApp,
  changePasswordForgotApp,
};
