import saveFile from "../repositories/uploadFile.repositories.js";

const uploadFileServices = async (files) => {
  
  return await saveFile.saveFiles(files);
  
};


export default {
  uploadFileServices,
};


