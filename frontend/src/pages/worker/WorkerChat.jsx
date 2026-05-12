import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";
import { useState } from "react";

const WorkerChat = () => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "user",
      text: "Hello, when will you come?",
    },
    {
      sender: "worker",
      text: "I will reach in 20 minutes.",
    },
  ]);

  const notifications = [
    "New message from Rama Keerthana",
    "New job assigned: Land Cleaning",
    "Customer requested live tracking",
  ];

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "worker",
        text: message,
      },
    ]);

    setMessage("");
  };

  return (
    <>
      <Navbar />
      <Sidebar />

      <div
        style={{
          marginLeft: "280px",
          padding: "110px 40px 40px",
          minHeight: "100vh",
          background: "#f8fafc",
          color: "#111827",
        }}
      >
        <h1>Worker Chat & Notifications</h1>

        <p style={{ color: "#64748b", marginTop: "8px" }}>
          Chat with customers and view work notifications.
        </p>

        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "25px",
          }}
        >
          {/* CHAT */}
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              height: "520px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2>Customer Chat</h2>

            <div
              style={{
                flex: 1,
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                overflowY: "auto",
              }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    alignSelf:
                      msg.sender === "worker"
                        ? "flex-end"
                        : "flex-start",
                    background:
                      msg.sender === "worker"
                        ? "#22c55e"
                        : "#e2e8f0",
                    color:
                      msg.sender === "worker"
                        ? "white"
                        : "#111827",
                    padding: "12px 16px",
                    borderRadius: "14px",
                    maxWidth: "300px",
                  }}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              <input
                type="text"
                placeholder="Type reply..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                }}
              />

              <button
                onClick={sendMessage}
                style={{
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Send
              </button>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              height: "fit-content",
            }}
          >
            <h2>Notifications</h2>

            <div
              style={{
                marginTop: "20px",
                display: "grid",
                gap: "14px",
              }}
            >
              {notifications.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "#f1f5f9",
                    padding: "14px",
                    borderRadius: "10px",
                    color: "#334155",
                  }}
                >
                  🔔 {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkerChat;