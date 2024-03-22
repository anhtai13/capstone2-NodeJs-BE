import multer from "multer";
import path from "path";

import imageRepository from '../repositories/uploadFile.repositories.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image'); // Adjust path as needed
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const addImage = (req, res) => {
  try {
    const uploadResult =  upload.single('image')(req, res); // Adjust field name

    if (uploadResult instanceof multer.MulterError) {
      return res.status(500).json({ message: 'Upload failed: ' + uploadResult.message });
    } else if (uploadResult.error) {
      return res.status(500).json({ message: 'Upload failed: ' + uploadResult.error.message });
    }

    const imageData = {
      filename: uploadResult.filename,
    };

    // Save image details to database
    imageRepository.saveImageDetails(imageData);

    return res.status(200).json({ message: 'Image uploaded successfully!', filename: imageData.filename });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ message: 'An error occurred while uploading the image.' });
  }
}

export default  {
    addImage,
};
