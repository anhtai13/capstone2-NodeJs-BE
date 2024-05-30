import getConnection from "../../config/connection.database.js";

const connection = getConnection();

const addFeedback = (params, callback) => {
  connection.query(
    "INSERT INTO feedback (user_id, full_name, content, created_at, created_by_id, updated_at, updated_by_id, service_id, rating, order_detail_id) VALUES (?,?,?,?,?,?,?,?,?, ?)",
    [
      params.user_id,
      params.full_name,
      params.content,
      new Date(),
      params.created_by_id,
      new Date(),
      params.updated_by_id,
      params.service_id,
      params.rating,
      params.order_detail_id,
    ],
    (err, results) => {
      if (err) {
        callback({ message: "Error adding feedback!" }, null);
      } else {
        const feedbackId = results.insertId;
        callback(null, { feedback_id: feedbackId });
      }
    }
  );
};

const searchFeedbacks = (params, callback) => {
  let query = "SELECT * FROM feedback WHERE 1=1";
  if (params.user_id) {
    query += ` AND user_id=${params.user_id}`;
  }
  if (params.service_id) {
    query += ` AND service_id=${params.service_id}`;
  }
  if (params.limit) {
    query += ` LIMIT ${params.limit}`;
  }
  if (params.offset) {
    query += ` OFFSET ${params.offset}`;
  }
  connection.query(query, (err, results) => {
    if (err) {
      callback({ message: "Error searching feedbacks!" }, null);
    } else {
      callback(null, results);
    }
  });
};

const getFeedbackDetail = (params, callback) => {
  connection.query(
    "SELECT * FROM feedback WHERE feedback_id=?",
    [params.id],
    (err, results) => {
      if (err) {
        callback({ message: "Error retrieving feedback detail!" }, null);
      } else if (results.length === 0) {
        callback({ message: "Feedback not found!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const updateFeedback = (params, callback) => {
  connection.query(
    "UPDATE feedback SET full_name=?, email=?, content=?, star=?, updated_at=?, updated_by_id=? WHERE feedback_id=?",
    [
      params.feedbackUpdate.full_name,
      params.feedbackUpdate.email,
      params.feedbackUpdate.content,
      params.feedbackUpdate.star,
      new Date(),
      params.feedbackUpdate.updated_by_id,
      params.id,
    ],
    (err, results) => {
      if (err) {
        callback({ message: "Error updating feedback!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const deleteFeedback = (params, callback) => {
  connection.query(
    "DELETE FROM feedback WHERE feedback_id=?",
    [params.id],
    (err, results) => {
      if (err) {
        callback({ message: "Error deleting feedback!" }, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const getAllFeedbacks = (callback) => {
  const query = `
    SELECT f.*, od.*
    FROM feedback f
    JOIN order_details od ON f.order_detail_id = od.order_detail_id;
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      callback({ message: "Error retrieving all feedbacks!", details: err }, null);
    } else {
      callback(null, results);
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
