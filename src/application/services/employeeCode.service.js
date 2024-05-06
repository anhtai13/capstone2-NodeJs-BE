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
<<<<<<< HEAD

export default { getListEmployeeAndOrderService }; // Sửa thành export đúng cách
=======
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
export default { getListEmployeeAndOrder,getListEmployeeReceipt }
>>>>>>> 028148a9109c369f57eb51ce8b479a6732a88d35
