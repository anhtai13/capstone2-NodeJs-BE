import forgotPasswordService from '../services/forgotpassword.service.js';

const forgotPassword = (req, res) => {
    const { email } = req.body;
  
    forgotPasswordService.forgotPassword(email, (err, result) => {
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
    forgotPassword
};
