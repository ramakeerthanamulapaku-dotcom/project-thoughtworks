import React, { useState } from "react";

import ForgotPassword
from "../components/Auth/ForgotPassword";

import OTPVerification
from "../components/Auth/OTPVerification";

function ForgotPasswordPage() {

  const [page, setPage] = useState("forgot");
  const [email, setEmail] = useState("");

  return (

    <>

      {page === "forgot" && (

        <ForgotPassword
          setPage={setPage}
          setEmail={setEmail}
        />

      )}

      {page === "otp" && (

        <OTPVerification
          email={email}
          setPage={setPage}
        />

      )}

      {page === "reset" && (

        <ResetPassword
          email={email}
          setPage={setPage}
        />
      )}

    </>

  );
}

export default ForgotPasswordPage;