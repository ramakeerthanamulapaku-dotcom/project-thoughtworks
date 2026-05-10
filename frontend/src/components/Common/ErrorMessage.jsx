import "./Common.css";

function ErrorMessage({ message }) {

  // IF NO ERROR
  if (!message) {
    return null;
  }

  return (

    <div className="error-box">

      <p>{message}</p>

    </div>

  );
}

export default ErrorMessage;