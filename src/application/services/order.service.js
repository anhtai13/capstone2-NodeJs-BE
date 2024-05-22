import orderRepositories from "../repositories/order.repositories.js";

const getListOrder = (params, callback) => {
  orderRepositories.getListOrder(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getListOrderByEmployeeCode = (employeeCode, callback) => {
  orderRepositories.getListOrderByEmployeeCode(employeeCode, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getListOrderByDateService = (workDate, employeeCode, callback) => {
  orderRepositories.getListOrderByDateRepository(workDate, employeeCode, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getOrderTotalPrice = (params, callback) => {
  orderRepositories.getOrderTotalPrice(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// const addOrder = (params, callback) => {
//   orderRepositories.addOrder(params, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result);
//     }
//   });
// };

const addOrder = (params, callback) => {
  orderRepositories.addOrder(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const addOrderDetails = (params, callback) => {
  orderRepositories.addOrderDetails(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


const getDetailOrder = (params, callback) => {
  orderRepositories.getDetailOrder(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getDetailOrderByUserId = (params, callback) => {
  orderRepositories.getDetailOrderByUserId(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const updateOrder = (params, callback) => {
  orderRepositories.updateOrder(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const deleteOrder = (params, callback) => {
  orderRepositories.deleteOrder(params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getStatusIdByEmployeeCode = (employeeCode, callback) => {
  orderRepositories.getStatusIdByEmployeeCodeRepository(employeeCode, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

export default {
  getListOrder,
  addOrder,
  getDetailOrder,
  updateOrder,
  deleteOrder,
  getOrderTotalPrice,
  getDetailOrderByUserId,
  addOrderDetails,
  getListOrderByEmployeeCode,
  getListOrderByDateService,
  getStatusIdByEmployeeCode,
};
