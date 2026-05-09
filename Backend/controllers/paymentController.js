const Payment = require("../models/Payment");

const createPayment = async (req, res) => {
  const payment = new Payment(req.body);
  await payment.save();
  res.send("Payment created");
};

const getPayments = async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
};


module.exports = {
  createPayment,
  getPayments
};