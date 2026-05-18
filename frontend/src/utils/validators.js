export const isEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isRequired = (value) => {
  return value && value.trim() !== "";
};

export const minLength = (value, length) => {
  return value.length >= length;
};