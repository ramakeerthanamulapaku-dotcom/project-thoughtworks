import {
  useEffect,
  useState,
} from "react";

import io from "socket.io-client";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./WorkerChat.css";


// SOCKET CONNECTION

const socket = io(
  "http://localhost:5000"
);


const WorkerChat = () => {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);


  // RECEIVE MESSAGES

  useEffect(() => {

    socket.on(
      "receiveMessage",
      (data) => {

        setMessages((prev) => [
          ...prev,
          data,
        ]);
      }
    );


    return () => {

      socket.off(
        "receiveMessage"
      );
    };

  }, []);


  // SEND MESSAGE

  const sendMessage = () => {

    if (!message.trim()) return;


    const newMessage = {

      sender: "worker",

      text: message,

      time:
        new Date()
          .toLocaleTimeString(),
    };


    // SEND TO SOCKET SERVER

    socket.emit(
      "sendMessage",
      newMessage
    );


    // UPDATE LOCAL UI

    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);


    setMessage("");
  };


  return (

    <div className="chat-page">

      <Sidebar />


      <div className="chat-content">

        <Navbar />


        <div className="chat-container">

          {/* HEADER */}

          <div className="chat-header">

            <h1>
              Worker Chat
            </h1>

            <p>
              Realtime communication
              with customer
            </p>

          </div>


          {/* CHAT BOX */}

          <div className="chat-box">

            {/* MESSAGES */}

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
                        msg.sender ===
                        "worker"

                          ? "message worker"

                          : "message user"
                      }
                    >

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


            {/* INPUT */}

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