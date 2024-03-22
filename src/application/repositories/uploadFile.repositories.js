import getConnection from "../../config/connection.database.js";

const addImage = (filename) => {
  try {
    const query = `INSERT INTO services (image) VALUES (?)`;
    const values = [filename.image];
     getConnection.query(query, values);
  } catch (error) {
    console.error('Error saving image details:', error);
    throw error; // Re-throw for handling in controller
  }
}

export default  {
    addImage,
};
