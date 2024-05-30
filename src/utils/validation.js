export const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  
  export const validateId = (id) => {
    return Number.isInteger(Number(id)) && id > 0;
  };
  
  export const validateStar = (star) => {
    return Number.isInteger(star) && star >= 1 && star <= 5;
  };
  
  export const validateContent = (content) => {
    return content && content.trim().length > 0;
  };
  
  export const validateName = (name) => {
    return name && name.trim().length > 0 && name.length <= 100;
  };
  