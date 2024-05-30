import feedbackRepository  from "../repositories/feedback.repositories.js";

import {
  validateEmail,
  validateId,
  validateStar,
  validateContent,
  validateName,
} from "../../utils/validation.js";

const addFeedback = (params, callback) => {
  if (!params.user_id) {
    callback({ message: "User ID is required!" }, null);
  } else if (!params.service_id) {
    callback({ message: "Service ID is required!" }, null);
  } else if (!params.full_name) {
    callback({ message: "Full Name is required!" }, null);
  } else if (!params.content) {
    callback({ message: "Content is required!" }, null);
  } else {
    feedbackRepository.addFeedback(params, callback);
  }
};


const searchFeedbacks = (params, callback) => {
  feedbackRepository.searchFeedbacks(params, callback);
};

const getFeedbackDetail = (params, callback) => {
  if (!validateId(params.id)) {
    callback({ message: "Invalid feedback ID!" }, null);
  } else {
    feedbackRepository.getFeedbackDetail(params, callback);
  }
};

const updateFeedback = (params, callback) => {
  if (!validateId(params.id)) {
    callback({ message: "Invalid feedback ID!" }, null);
  } else {
    feedbackRepository.updateFeedback(params, callback);
  }
};

const deleteFeedback = (params, callback) => {
  if (!validateId(params.id)) {
    callback({ message: "Invalid feedback ID!" }, null);
  } else {
    feedbackRepository.deleteFeedback(params, callback);
  }
};

const getAllFeedbacks = (callback) => {
  feedbackRepository.getAllFeedbacks(callback);
};


export default {
  addFeedback,
  searchFeedbacks,
  getFeedbackDetail,
  updateFeedback,
  deleteFeedback,
  getAllFeedbacks,
};
