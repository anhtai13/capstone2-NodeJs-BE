import employeeCodeRepositories from "../repositories/employeeCode.repositories.js";

const getListDebtHistory = (params, callback) => {
    employeeCodeRepositories.getListDebtHistory(params, (err, result) => {
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

// lấy danh sách các nhân viên có tổng tiền nợ theo Id
const getListEmployeeReceiptId = (params, callback) => {
    employeeCodeRepositories.getListEmployeeReceiptId(params, (err, result) => {
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

export default { getListDebtHistory ,getListEmployeeReceipt ,AddEmployeeDebt, getListEmployeeReceiptId}
