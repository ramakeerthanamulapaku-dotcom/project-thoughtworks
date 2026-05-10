import React, { useState } from "react";
import "./Payment.css";

const PaymentButton = ({ amount = 0, onPay }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 🔥 later connect Razorpay / Stripe / backend API here
      console.log("Processing payment:", amount);

      await new Promise((res) => setTimeout(res, 1200));

      if (onPay) onPay(amount);

      alert("Payment Successful 🚀");
    } catch (err) {
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="payment-btn" onClick={handlePayment} disabled={loading}>
      {loading ? "Processing..." : `Pay ₹${amount}`}
    </button>
  );
};

export default PaymentButton;