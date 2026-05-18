import axios from "axios";

const API = "http://localhost:5000/api/maintenance";

// CREATE COMPLAINT
const submitComplaint = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API, data, config);
  return res.data;
};

// GET ALL COMPLAINTS
const getComplaints = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`${API}/all`, config);
  return res.data;
};

const maintenanceService = {
  submitComplaint,
  getComplaints,
};

export default maintenanceService;