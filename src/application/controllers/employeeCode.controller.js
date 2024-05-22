import employeeCodeService from "../services/employeeCode.service.js";

const getListDebtHistory = (req, res) => {
    const id = req.body.id; // Chắc chắn rằng đối số được truyền vào là req.params.id
    employeeCodeService.getListDebtHistory(id, (err, result) => {
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

// lấy danh sách các nhân viên có tổng tiền nợ
const getListEmployeeReceiptId = (req, res) => {
    const id = req.params.id
    employeeCodeService.getListEmployeeReceiptId(id, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    })
}

const AddEmployeeDebt = (req, res) => {
    const receiptUpdated = req.body

    employeeCodeService.AddEmployeeDebt(receiptUpdated, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send({
                errData: err.data,
                error: err.message
            });
        } else {
            res.status(202).send("Success");
        }
    })
}
export default {
    getListDebtHistory,
    getListEmployeeReceipt,
    AddEmployeeDebt,
    getListEmployeeReceiptId,
}
