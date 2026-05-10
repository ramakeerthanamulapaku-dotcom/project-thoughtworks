import axios from "axios";

const API_URL = "http://localhost:5000/api/lands"; 

export const getLands = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addLand = async (landData) => {
  // If you are uploading images, you might need 'multipart/form-data'
  const response = await axios.post(API_URL, landData);
  return response.data;
};

export const deleteLand = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};