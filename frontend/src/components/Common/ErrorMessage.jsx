import "./Common.css";

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <p>{message || "Something went wrong!"}</p>
    </div>
  );
}

export default ErrorMessage;