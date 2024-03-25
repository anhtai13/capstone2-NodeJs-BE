import saveFile from "../repositories/uploadFile.repositories.js";

const uploadFileServices = async (service) => {
  
  return await saveFile.saveFiles(service);
  
};


export default {
  uploadFileServices,
};


