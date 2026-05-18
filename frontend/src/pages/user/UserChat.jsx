import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import io from "socket.io-client";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

import "./userChat.css";


// SOCKET CONNECTION

const socket = io(
  "http://localhost:5000",
  {
    autoConnect: false,
  }
);


const UserChat = () => {

  const [bookings, setBookings] =
    useState([]);

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");


  const token =
    localStorage.getItem(
      "token"
    );


  const userInfo = JSON.parse(
    localStorage.getItem(
      "userInfo"
    )
  );


  // ==========================
  // FETCH BOOKINGS
  // ==========================

  const fetchBookings =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/bookings",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setBookings(
          res.data.bookings || []
        );

      } catch (error) {

        console.log(error);
      }
    };


  // ==========================
  // FETCH OLD MESSAGES
  // ==========================

  const fetchMessages =
    async (bookingId) => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/chat/${bookingId}`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setMessages(
          res.data.messages || []
        );

      } catch (error) {

        console.log(error);
      }
    };


  // ==========================
  // INITIAL LOAD
  // ==========================
 useEffect(() => {

  const loadData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/bookings",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const bookingData =
        res.data.bookings || [];

      setBookings(bookingData);

      // AUTO SELECT FIRST BOOKING

      if (bookingData.length > 0) {

        setSelectedBooking(
          bookingData[0]
        );

        fetchMessages(
          bookingData[0]._id
        );

        socket.emit(
          "joinRoom",
          bookingData[0]._id
        );
      }

    } catch (error) {

      console.log(error);
    }
  };

  loadData();

  socket.connect();

  return () => {

    socket.disconnect();
  };

}, []);
  

  // ==========================
  // SOCKET RECEIVE
  // ==========================

  useEffect(() => {

    socket.on(
      `receiveMessage-${userInfo._id}`,

      (newMessage) => {

        if (
          selectedBooking &&
          newMessage.bookingId ===
            selectedBooking._id
        ) {

          setMessages(
            (prev) => [
              ...prev,
              newMessage,
            ]
          );
        }
      }
    );


    return () => {

      socket.off(
        `receiveMessage-${userInfo._id}`
      );
    };

  }, [selectedBooking]);


  // ==========================
  // SELECT CHAT
  // ==========================

  const openChat = async (
    booking
  ) => {

    setSelectedBooking(
      booking
    );

    fetchMessages(
      booking._id
    );


    // JOIN ROOM

    socket.emit(
      "joinRoom",
      booking._id
    );
  };


  // ==========================
  // SEND MESSAGE
  // ==========================

  const sendMessage =
    async () => {

      if (
        !text.trim() ||
        !selectedBooking
      ) return;


      try {

        const messageData = {

          bookingId:
            selectedBooking._id,

          senderId:
            userInfo._id,

          receiverId:
            selectedBooking
              ?.workerId?._id,

          text,

          senderName:
            userInfo.name,
        };


        // SAVE TO DATABASE

        await axios.post(
          "http://localhost:5000/api/chat/send",

          messageData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );


        // REALTIME SOCKET

        socket.emit(
          "sendMessage",
          messageData
        );
       setMessages((prev) => [
  ...prev,
  messageData,
]);



        setText("");

      } catch (error) {

        console.log(error);
      }
    };


  return (

    <>
      <Navbar />

      <Sidebar />

      <div className="user-chat-page">

        {/* HEADER */}

        <div className="chat-header">

          <h1>
            User Chat
          </h1>

          <p>
            Realtime communication
            with workers.
          </p>

        </div>


       

       

        {/* CHAT */}

        {selectedBooking && (

          <div className="chat-box">

            <h2>

              Chat With

              {" "}

              {
                selectedBooking
                  ?.workerId
                  ?.name
              }

            </h2>


            {/* MESSAGES */}

            <div className="messages-container">

              {messages.map(
                (msg, index) => (

                  <div
                    key={index}

                    className={
  msg.senderId?.toString() ===
  userInfo._id?.toString()

    ? "my-message"

    : "other-message"
}
                  >

                    <strong>

                      {
                        msg.senderName
                      }

                    </strong>

                    <p>
                      {msg.text}
                    </p>

                  </div>
                )
              )}

            </div>


            {/* INPUT */}

            <div className="message-input">

              <input
                type="text"

                placeholder="Type message..."

                value={text}

                onChange={(e) =>
                  setText(
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
        )}

      </div>

    </>
  );
};

export default UserChat;