import { useState } from "react";
import axios from "axios";

const PaymentPage = () => {

  const [amount, setAmount] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // LOAD RAZORPAY SCRIPT
  const loadRazorpayScript = () => {

    return new Promise((resolve) => {

      const script =
        document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);

    });

  };

  // HANDLE PAYMENT
  const handlePayment = async (e) => {

    e.preventDefault();

    setLoading(true);

    const loaded =
      await loadRazorpayScript();

    if (!loaded) {

      alert(
        "Razorpay SDK failed to load"
      );

      setLoading(false);

      return;

    }

    try {

      // CREATE ORDER
      const orderRes =
        await axios.post(
          "http://localhost:5000/api/payments/create-order",
          {
            amount,
          }
        );

      const order =
        orderRes.data.order;

      // PAYMENT OPTIONS
      const options = {

        key:
          "rzp_test_SoXotTdP7AygPu",

        amount:
          order.amount,

        currency:
          order.currency,

        name:
          "LandEase",

        description:
          "Land Maintenance Payment",

        order_id:
          order.id,

        handler:
          async function (
            response
          ) {

            // VERIFY PAYMENT
            const verifyRes =
              await axios.post(
                "http://localhost:5000/api/payments/verify-payment",
                {
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,

                  amount,
                  
                }
              );

            if (
              verifyRes.data.success
            ) {

              alert(
                "Payment Successful"
              );

            }

            else {

              alert(
                "Payment Verification Failed"
              );

            }

          },

        prefill: {

          name:
            "Keerthana",

          email:
            "ramakeerthanamulapaku@gmail.com",

        },

        theme: {

          color:
            "#22c55e",

        },

      };

      const paymentObject =
        new window.Razorpay(
          options
        );

      paymentObject.open();

    } catch (error) {

      console.log(error);

      alert(
        "Payment Failed"
      );

    }

    setLoading(false);

  };

  return (

    <div className="page">

      <h2>
        Razorpay Payment
      </h2>

      <form
        className="form"
        onSubmit={handlePayment}
      >

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          required
        />

        <button type="submit">

          {loading
            ? "Processing..."
            : "Pay Now"}

        </button>

      </form>

    </div>
  );
};

export default PaymentPage;