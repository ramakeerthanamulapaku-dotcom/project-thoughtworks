import API from "./api";

// GET payment history
export const getPayments = async () => {
  return await API.get("/payments");
};

// MAKE payment
export const makePaymentAPI = async (data) => {
  return await API.post("/payments", data);
};