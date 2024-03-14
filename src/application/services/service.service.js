import {
  validateIdDetailAndDelete,
  validatePrice,
} from "../../utils/validationProduct.js";
import serviceRepositories from "../repositories/service.repositories.js";

const getListServices = (params, callback) => {
  serviceRepositories.getListServices(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getSericeByCategory = (params, callback) => {
  serviceRepositories.getSericeByCategory(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
const getCategory = (params, callback) => {
  serviceRepositories.getCategory(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
// hàm add dịch vụ
const addSerice = (params, callback) => {
    if (!params.name && !params.price) {
        callback({ message: "Please complete all information" }, null);
      }
    else if (!params.name) {
    callback({ message: "Error: Please enter a service name" }, null);
  } else if (!params.price) {
    callback({ message: "Error: Please enter service price" }, null);
  } else if (!validatePrice(params.price)) {
    callback(
      {
        message:"Error: Amount cannot be negative. Please enter a valid amount",
      },null);
  }else{
    serviceRepositories.addSerice(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

const getDetailSerice = (params, callback) => {
  if (!validateIdDetailAndDelete(params.id)) {
    callback({ message: "Invalid id" }, null);
  } else {
    serviceRepositories.getDetailSerice(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

const updateSerice = (params, callback) => {
  if (
    !params.name &&
    !params.sku &&
    !params.quantity &&
    !params.price &&
    !params.category
  ) {
    callback({ message: "Please complete all information" }, null);
  } else if (!validatePrice(params.price)) {
    callback({ message: "Invalid price" }, null);
  } else {
    serviceRepositories.updateSerice(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

const deleteSerice = (params, callback) => {
  if (!validateIdDetailAndDelete(params.id)) {
    callback({ message: "Invalid id" }, null);
  } else {
    serviceRepositories.deleteSerice(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

export default {
  getListSerices,
  getCategory,
  getSericeByCategory,
  addSerice,
  getDetailSerice,
  updateSerice,
  deleteSerice,
};
