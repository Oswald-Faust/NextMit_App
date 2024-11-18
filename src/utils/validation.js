export const validateUserData = (userData) => {
  const errors = {};
  
  if (!userData.email?.includes('@')) {
    errors.email = 'Email invalide';
  }
  
  if (userData.phoneNumber && !/^\+\d{1,3}\d{9,}$/.test(userData.phoneNumber)) {
    errors.phoneNumber = 'Numéro de téléphone invalide';
  }
  
  return errors;
}; 