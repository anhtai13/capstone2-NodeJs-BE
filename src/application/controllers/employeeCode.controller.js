import employeeCodeService from "../services/employeeCode.service.js";

const getListEmployeeAndOrder = (req, res) => {
    const id = req.body.id; // Chắc chắn rằng đối số được truyền vào là req.params.id
    employeeCodeService.getListEmployeeAndOrderService(id, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}
// lấy danh sách các nhân viên có tổng tiền nợ
const getListEmployeeReceipt = (req, res) => {
    const id = req.body.id
    employeeCodeService.getListEmployeeReceipt(id, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}
export default {
<<<<<<< HEAD
    getListEmployeeAndOrder
}
=======
    getListEmployeeAndOrder,
    getListEmployeeReceipt
}
>>>>>>> 028148a9109c369f57eb51ce8b479a6732a88d35
