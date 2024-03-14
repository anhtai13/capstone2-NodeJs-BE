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

const getServiceByCategory = (params, callback) => {
  serviceRepositories.getServiceByCategory(params, (err, result) => {
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
const addService = (params, callback) => {
    if (!params.name_service && !params.unit_price) {
        callback({ message: "Please complete all information" }, null);
      }
    else if (!params.name_service) {
    callback({ message: "Error: Please enter a service name" }, null);
  } else if (!params.unit_price) {
    callback({ message: "Error: Please enter service price" }, null);
  } else if (!validatePrice(params.unit_price)) {
    callback(
      {
        message:"Error: Amount cannot be negative. Please enter a valid amount",
      },null);
  }else{
    serviceRepositories.addService(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

const getDetailService = (params, callback) => {
  if (!validateIdDetailAndDelete(params.services_id)) {
    callback({ message: "Invalid id" }, null);
  } else {
    serviceRepositories.getDetailService(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

const updateService = (params, callback) => {
  if (
    !params.name_service &&
    !params.sku &&
    !params.quantity &&
    !params.unit_price &&
    !params.category
  ) {
    callback({ message: "Please complete all information" }, null);
  } else if (!validatePrice(params.unit_price)) {
    callback({ message: "Invalid price" }, null);
  } else {
    serviceRepositories.updateService(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

const deleteService = (params, callback) => {
  if (!validateIdDetailAndDelete(params.service_id)) {
    callback({ message: "Invalid id" }, null);
  } else {
    serviceRepositories.deleteService(params, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

export default {
  getListServices,
  getCategory,
  getServiceByCategory,
  addService,
  getDetailService,
  updateService,
  deleteService,
};
