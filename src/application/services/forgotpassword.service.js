import forgotPasswordRepositories from '../repositories/forgotpassword.repositories.js';


const forgotPassword = (params, callback) => {
  forgotPasswordRepositories.forgotPassword(params, (error, result) => {
    if (error) {
      callback(error);
    } else {
      callback(null, result);
    }
  });
};



export default {
  forgotPassword
};
