import axios from "axios";

const API_URL = "http://localhost:5000/api/payments";

export const getPaymentHistory = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const processPayment = async (paymentDetails) => {
  // This would usually link to Stripe, Razorpay, etc.
  const response = await axios.post(`${API_URL}/checkout`, paymentDetails);
  return response.data;
};

export const verifyPayment = async (paymentId) => {
  const response = await axios.get(`${API_URL}/verify/${paymentId}`);
  return response.data;
};