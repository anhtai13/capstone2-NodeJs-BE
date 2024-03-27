import userService from "../services/user.service.js";
const searchUsers = (req, res) => {
  const { name } = req.query;
  const sortName = req.query.sortUserName;
  const sortRole = req.query.sortRole;
  const sortLastName = req.query.sortLastName;
  const limit = req.query.limit;
  const offset = req.query.offset;
  userService.searchUsers(
    { name, sortName, sortRole, sortLastName, limit, offset },
    (err, result) => {
      if (err) {
        res.status(500).send({
          errMessage: err.message,
        });
      } else {
        res.status(200).send(result);
      }
    }
  );
};

const addUser = (req, res) => {
  const newUser = req.body;
  userService.addUser(newUser, (err, result) => {
    if (err) {
      res.status(500).send({
        errData: err.data,
        error: err.message,
      });
    } else {
      res.status(201).send({ message: "Add Accout Succesfull!!" });
    }
  });
};

const getDetailUser = (req, res) => {
  const { id } = req.params;

  userService.getDetailUser({ id }, (err, result) => {
    if (err) {
      res.status(500).send({
        error: err.message,
      });
    } else {
      res.status(201).send({
        user: result,
      });
    }
  });
};


const updateUser = (req, res) => {
  const { id } = req.params;
  const userUpdate = req.body;
  const info = {
    id: id,
    userUpdate: userUpdate,
  };
  userService.updateUser(info, (err) => {
    if (err) {
      res.status(500).send({
        errData: err.data,
        error: err.message,
      });
    } else {
      res.status(202).send("Success");
    }
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  userService.deleteUser({ id }, (err, result) => {
    if (err) {
      res.status(500).send({
        error: err.message,
      });
    } else {
      res.status(204).send("Success");
    }
  });
};


const updateInformationCustomer = (req, res) => {     // thay đổi thông tin cá nhân customer
  const { id } = req.params;
  const userData = req.body; // Dữ liệu mới của người dùng

  console.log("Received request to update user with ID:", id);
  console.log("New user data:", userData);

  userService.updateInformationCustomer(id, userData, (err, result) => {
    if (err) {
      console.error("Error updating user:", err.message);
      res.status(500).send({
        error: err.message,
      });
    } else {
      console.log("User updated successfully");
      res.status(200).send({
        message: "User updated successfully",
      });
    }
  });
};


export default {
  searchUsers,
  addUser,
  getDetailUser,
  updateUser,
  deleteUser,
  updateInformationCustomer,
};
