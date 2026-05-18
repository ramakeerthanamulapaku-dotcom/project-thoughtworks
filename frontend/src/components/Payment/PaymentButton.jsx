import { useLocation } from "react-router-dom";

import "./payment.css";

function PaymentButton() {

  // SERVICE DATA FROM BOOKING PAGE
  const location = useLocation();

  const service =
    location.state?.service || {

      name: "Land Cleaning",

      price: 1200,

    };

  // RAZORPAY PAYMENT
  const handlePayment = async () => {

    const options = {

      key: "YOUR_RAZORPAY_KEY_ID",

      amount: service.price * 100,

      currency: "INR",

      name: "LandEase",

      description: service.name,

      handler: function (response) {

        alert(
          "Payment Successful ✅"
        );

        console.log(response);

      },

      theme: {
        color: "#22c55e",
      },

    };

    const razor = new window.Razorpay(
      options
    );

    razor.open();
  };

  return (

    <div className="payment-page">

      <div className="payment-container">

        {/* LEFT */}
        <div className="payment-left">

          <h2>
            Complete Payment
          </h2>

          <p>
            Secure payment for your
            booked service
          </p>

          {/* SERVICE CARD */}
          <div className="service-card">

            <div>

              <h3>
                {service.name}
              </h3>

              <p>
                Service Booking
              </p>

            </div>

            <span>
              ₹ {service.price}
            </span>

          </div>

          {/* METHODS */}
          <div className="payment-methods">

            <h3>
              Available Payment Methods
            </h3>

            <div className="method-grid">

              <div className="method">
                Google Pay
              </div>

              <div className="method">
                PhonePe
              </div>

              <div className="method">
                Paytm
              </div>

              <div className="method">
                UPI
              </div>

              <div className="method">
                Cards
              </div>

              <div className="method">
                Net Banking
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="payment-right">

          <h3>
            Billing Summary
          </h3>

          <div className="bill-row">

            <span>
              Service Charge
            </span>

            <span>
              ₹ {service.price}
            </span>

          </div>

          <div className="bill-row">

            <span>
              Platform Fee
            </span>

            <span>
              ₹ 50
            </span>

          </div>

          <div className="bill-row total">

            <span>Total</span>

            <span>
              ₹ {service.price + 50}
            </span>

          </div>

          {/* BUTTON */}
          <button
            className="pay-btn"
            onClick={handlePayment}
          >

            Pay Now

          </button>

        </div>

      </div>

    </div>
  );
}

export default PaymentButton;