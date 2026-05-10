import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPayment } from "../redux/slices/paymentSlice";

const PaymentPage = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("UPI");
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.payment);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addPayment({ amount, method }));
  };

  return (
    <div className="page">
      <h2>Payment</h2>
      <form className="form" onSubmit={submitHandler}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="NetBanking">Net Banking</option>
        </select>
        <button type="submit">{loading ? "Processing..." : "Pay Now"}</button>
        {success && <p className="success">Payment successful</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentPage;