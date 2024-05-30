import feedbackService from "../services/feedback.service.js";

const addFeedback = (req, res) => {
  const newFeedback = req.body;
  feedbackService.addFeedback(newFeedback, (err, result) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(201).send({ message: "Feedback added successfully!" });
    }
  });
};

const searchFeedbacks = (req, res) => {
  const { user_id, service_id, limit, offset } = req.query;
  feedbackService.searchFeedbacks(
    { user_id, service_id, limit, offset },
    (err, result) => {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.status(200).send(result);
      }
    }
  );
};

const getFeedbackDetail = (req, res) => {
  const { id } = req.params;
  feedbackService.getFeedbackDetail({ id }, (err, result) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send(result);
    }
  });
};

const updateFeedback = (req, res) => {
  const { id } = req.params;
  const feedbackUpdate = req.body;
  feedbackService.updateFeedback({ id, feedbackUpdate }, (err) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(202).send("Feedback updated successfully!");
    }
  });
};

const deleteFeedback = (req, res) => {
  const { id } = req.params;
  feedbackService.deleteFeedback({ id }, (err) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(204).send("Feedback deleted successfully!");
    }
  });
};

const getAllFeedbacks = (req, res) => {
  feedbackService.getAllFeedbacks((err, result) => {
    if (err) {
      console.error('Error in feedbackService.getAllFeedbacks:', err);
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send(result);
    }
  });
};

export default {
  addFeedback,
  searchFeedbacks,
  getFeedbackDetail,
  updateFeedback,
  deleteFeedback,
  getAllFeedbacks,
};
