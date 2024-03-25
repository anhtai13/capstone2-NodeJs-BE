import uploadFileService from '../services/uploadFile.service.js';
import multer from "multer";
import path from 'path';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/public/images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const upload = multer({ storage });
const uploadImage = upload.single('image')
 function uploadFile(req, res) {
  try {
    
    const files = req.file;
    console.log(req.file);
    const result =  uploadFileService.uploadFileServices(files);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export default {
  uploadFile,
  uploadImage
};
