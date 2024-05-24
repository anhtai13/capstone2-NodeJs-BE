import {
  validateEmail,
  validateIdUserDetails,
  validatePassword,
  validatePhoneNumber,
  validateRoleUser,
  validateUserName,
} from "../../utils/validationUser.js";
import userRepositories from "./../repositories/user.repositories.js";

// Hàm tìm kiếm người dùng
const searchUsers = (params, callback) => {
  userRepositories.searchUsers(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Hàm thêm người dùng mới
const addUser = (params, callback) => {
  if (!params.username) {
    callback({ message: "Username is required!" }, null);
  } else if (!params.password) {
    callback({ message: "Password is required!" }, null);
  } else if (!params.email) {
    callback({ message: "Email is required!" }, null);
  } else if (!validateEmail(params.email)) {
    callback({ message: "Invalid email format!" }, null);
  } else if (!params.first_name) {
    callback({ message: "First name is required!" }, null);
  } else if (!params.last_name) {
    callback({ message: "Last name is required!" }, null);
  } else if (!params.role) {
    callback({ message: "Role is required!" }, null);
  } else if (!validateRoleUser(params.role)) {
    callback({ message: "Invalid role!" }, null);
  } else if (!validatePassword(params.password)) {
    callback({ message: "Password must be at least 6 characters long!" }, null);
  } else if (!validateUserName(params.username)) {
    callback({ message: "Invalid username!" }, null);
  } else if (!validatePhoneNumber(params.phone_number)) {
    callback({ message: "Invalid phone number format!" }, null);
  } else {
    userRepositories.addUser(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

// Hàm lấy chi tiết người dùng
const getDetailUser = (params, callback) => {
  if (!validateIdUserDetails(params.id)) {
    callback({ message: "Invalid ID!" }, null);
  } else {
    userRepositories.getDetailUser(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

// Hàm cập nhật thông tin người dùng
const updateUser = (params, callback) => {
  
    userRepositories.updateUser(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }

// Hàm xóa người dùng
const deleteUser = (params, callback) => {
  if (!validateIdUserDetails(params.id)) {
    callback({ message: "Invalid ID!" }, null);
  } else {
    userRepositories.deleteUser(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result,{ message: "Delete User success" });
        
      }
    });
  }
};


const updateInformationCustomer = (id, userData, callback) => {
  console.log("Updating user with ID:", id);
  console.log("New user data:", userData);

  userRepositories.updateInformationCustomer(id, userData, (err, result) => {
    if (err) {
      console.error("Error updating user in service:", err.message);
      callback(err, null);
    } else {
      console.log("User updated successfully in service");
      callback(null, result);
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
