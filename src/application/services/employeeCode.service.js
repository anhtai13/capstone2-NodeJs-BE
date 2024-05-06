import employeeCodeRepositories from "../repositories/employeeCode.repositories.js";

const getListEmployeeAndOrderService = (params, callback) => {
    employeeCodeRepositories.getListEmployeeAndOrder(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

export default { getListEmployeeAndOrderService }; // Sửa thành export đúng cách
