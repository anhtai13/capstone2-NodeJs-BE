import resetPasswordService from '../services/resetpassword.service.js';


const resetPassword = (req, res) => {
    const formData = req.body;
  
    resetPasswordService.resetPassword(formData, (err, result) => {
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
    resetPassword
};
