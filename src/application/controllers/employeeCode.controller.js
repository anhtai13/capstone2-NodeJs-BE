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

export default {
    getListEmployeeAndOrder
}
