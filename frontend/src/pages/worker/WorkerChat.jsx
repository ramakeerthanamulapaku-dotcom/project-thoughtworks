import {
  useEffect,
  useState,
} from "react";

import io from "socket.io-client";

import API from "../../services/api";  

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./WorkerChat.css";

const socket = io(
  "http://localhost:5000"
);

const WorkerChat = () => {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

    const token =
  localStorage.getItem("token");

  const workerInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const bookingId =
    localStorage.getItem(
      "activeBookingId"
    );

  const receiverId =
    localStorage.getItem(
      "activeUserId"
    );

  // =========================
  // SOCKET RECEIVE
  // =========================

  useEffect(() => {

    socket.on(
      `receiveMessage-${workerInfo._id}`,
      (data) => {

        setMessages((prev) => [
          ...prev,
          data,
        ]);
      }
    );

    return () => {

      socket.off(
        `receiveMessage-${workerInfo._id}`
      );
    };

  }, []);

  // =========================
  // SEND MESSAGE
  // =========================
   const sendMessage = async () => {

  if (!message.trim())
    return;

  const bookingId =
    localStorage.getItem(
      "activeBookingId"
    );

  const receiverId =
    localStorage.getItem(
      "activeUserId"
    );

  const messageData = {

    bookingId,

    senderId:
      workerInfo._id,

    receiverId,

    senderName:
      workerInfo.name,

    text: message,

    time:
      new Date()
        .toLocaleTimeString(),
  };

  try {

    // SAVE TO DATABASE
       console.log("Sending message:", messageData);
    await API.post("/chat/send", messageData, {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    });

    // REALTIME SOCKET

    socket.emit(
      "sendMessage",
      messageData
    );

    // UPDATE UI

    setMessages((prev) => [
      ...prev,
      messageData,
    ]);

    setMessage("");

  } catch (error) {

    console.log(error);
  }
};
  
  return (

    <div className="chat-page">

      <Sidebar />

      <div className="chat-content">

        <Navbar />

        <div className="chat-container">

          <div className="chat-header">

            <h1>
              Worker Chat
            </h1>

            <p>
              Realtime communication
              with customer
            </p>

          </div>

          <div className="chat-box">

            <div className="messages-container">

              {messages.length === 0 ? (

                <div className="empty-chat">
                  No messages yet
                </div>

              ) : (

                messages.map(
                  (msg, index) => (

                    <div
                      key={index}

                      className={
                        msg.senderId ===
                        workerInfo._id

                          ? "message worker"

                          : "message user"
                      }
                    >

                      <strong>
                        {msg.senderName}
                      </strong>

                      <p>
                        {msg.text}
                      </p>

                      <span>
                        {msg.time}
                      </span>

                    </div>
                  )
                )
              )}

            </div>

            <div className="chat-input-box">

              <input
                type="text"

                placeholder="Type message..."

                value={message}

                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
              />

              <button
                onClick={sendMessage}
              >
                Send
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
export default WorkerChat;