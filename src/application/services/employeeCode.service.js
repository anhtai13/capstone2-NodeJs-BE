import employeeCodeRepositories from "../repositories/employeeCode.repositories.js";

const getListEmployeeAndOrder = (params, callback) => {
    employeeCodeRepositories.getListEmployeeAndOrder(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

export default { getListEmployeeAndOrder }