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
// lấy danh sách các nhân viên có tổng tiền nợ
const getListEmployeeReceipt = (params, callback) => {
    employeeCodeRepositories.getListEmployeeReceipt(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

const AddEmployeeDebt = (params, callback) => {
    employeeCodeRepositories.AddEmployeeDebt(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

export default { getListEmployeeAndOrderService ,getListEmployeeReceipt ,AddEmployeeDebt}
