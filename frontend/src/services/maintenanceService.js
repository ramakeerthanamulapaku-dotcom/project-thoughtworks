import API from "./api";
// GET all complaints
export const getComplaints = async () => {
  return await API.get("/maintenance");
};
// CREATE complaint
export const createComplaintAPI = async (data) => {
  return await API.post("/maintenance", data);
};