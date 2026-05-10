import React from "react";
import "./Payment.css";

const PaymentHistory = ({ payments = [] }) => {
  return (
    <div className="payment-history">
      <h2>Payment History</h2>

      {payments.length === 0 ? (
        <p className="empty">No payments found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, index) => (
              <tr key={index}>
                <td>{p.id}</td>
                <td>₹{p.amount}</td>
                <td className={p.status}>{p.status}</td>
                <td>{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;