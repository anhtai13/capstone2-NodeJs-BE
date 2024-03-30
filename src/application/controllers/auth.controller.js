import authService from "../services/auth.service.js";

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

// const changePassword = (req, res) => {
//     const { currentPassword, newPassword, confirmPassword } = req.body;

//     if (newPassword !== confirmPassword) {
//         return res.status(400).json({ message: "Mật khẩu mới và xác nhận mật khẩu mới không khớp." });
//     }

//     authService.changePassword(req.user.id, currentPassword, newPassword, (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: "Đã xảy ra lỗi khi thay đổi mật khẩu.", error: err });
//         }
//         return res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công." });
//     });
// };

export default {
  login,
  logout,

  login1,
};
