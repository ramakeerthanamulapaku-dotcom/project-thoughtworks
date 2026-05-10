import axios from "axios";

const API_URL = "http://localhost:5000/api/maintenance";

export const getComplaints = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const submitComplaint = async (complaintData) => {
  const response = await axios.post(API_URL, complaintData);
  return response.data;
};

export const updateMaintenanceStatus = async (id, status) => {
  const response = await axios.patch(`${API_URL}/${id}`, { status });
  return response.data;
};