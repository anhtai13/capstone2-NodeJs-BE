import resetPasswordRepositories from '../repositories/resetpassword.repositories.js';

// reset password 
const resetPassword = (params, callback) => {
  resetPasswordRepositories.resetPassword(params, (error, result) => {
    if (error) {
      callback(error);
    } else {
      callback(null, result);
    }
  });
};

export default {

  resetPassword
};
