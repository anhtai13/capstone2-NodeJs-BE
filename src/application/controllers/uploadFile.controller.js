import imageService from '../services/uploadFile.service.js';

const addImage = (req, res) => {
  try {
     imageService.addImage(req, res);
  } catch (error) {
    console.error('Error in image controller:', error);
    res.status(500).json({ message: 'An error occurred while uploading the image.' });
  }
}

export default {
    addImage,
};
