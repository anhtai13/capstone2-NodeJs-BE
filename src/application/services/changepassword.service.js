import ChangePasswordRepositories from "../repositories/changepassword.repositories.js";

const changePassword = (params, callback) => {
    ChangePasswordRepositories.changePassword(params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

export default {
    changePassword,
};
