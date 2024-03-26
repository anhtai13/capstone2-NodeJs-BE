import saveFile from "../repositories/uploadFile.repositories.js";

// add new service anđ upload file image
const addFileServices = async (service) => {
  
  return await saveFile.addService(service);
  
};

// Edit service for id anđ upload file image
const editFileServices = async (service) => {
  
  return await saveFile.editService(service);
  
};




export default {
  addFileServices,
  editFileServices,
 
};


