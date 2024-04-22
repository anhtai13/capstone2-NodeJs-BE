import ChangePasswordService from "../services/changepassword.service.js";

const changePassword = (req, res) => {
    const user_id = req.params.id;
    const { oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) {
        return res.status(400).send({
            errMessage: "New password must be different from old password."
        });
    }

    ChangePasswordService.changePassword({ user_id, oldPassword, newPassword }, (err, result) => {
        if (err) {
            res.status(500).send({
                errMessage: err.message
            });
        } else {
            res.status(200).send(result);
        }
    });
};

export default {
    changePassword,
};
