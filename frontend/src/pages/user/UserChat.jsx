import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";
import { useState } from "react";

const UserChat = () => {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([
      {
        sender: "worker",
        text: "Hello sir, I am on the way.",
      },
      {
        sender: "user",
        text: "Okay, please come quickly.",
      },
    ]);

  const sendMessage = () => {

    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "user",
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
          display: "flex",
          flexDirection: "column",
        }}
      >

        <h1
          style={{
            marginBottom: "10px",
            color: "#111827",
          }}
        >
          Worker Chat
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "25px",
          }}
        >
          Chat with assigned worker in real time.
        </p>

        {/* CHAT BOX */}
        <div
          style={{
            flex: 1,
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            boxShadow:
              "0 6px 18px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            height: "500px",
          }}
        >

          {/* MESSAGES */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >

            {messages.map(
              (msg, index) => (

                <div
                  key={index}
                  style={{
                    alignSelf:
                      msg.sender === "user"
                        ? "flex-end"
                        : "flex-start",

                    background:
                      msg.sender === "user"
                        ? "#22c55e"
                        : "#e2e8f0",

                    color:
                      msg.sender === "user"
                        ? "white"
                        : "#111827",

                    padding: "12px 16px",
                    borderRadius: "14px",
                    maxWidth: "300px",
                  }}
                >
                  {msg.text}
                </div>

              )
            )}

          </div>

          {/* INPUT */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
            }}
          >

            <input
              type="text"
              placeholder="Type message..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "8px",
                border:
                  "1px solid #cbd5e1",
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

      </div>
    </>
  );
};

export default UserChat;