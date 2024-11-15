export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return re.test(phone);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
}; 