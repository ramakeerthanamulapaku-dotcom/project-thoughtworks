const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const http = require("http");

const { Server } = require("socket.io");

require("dotenv").config();


// ROUTES

const authRoutes =
require("./routes/authRoutes");

const serviceRoutes =
require("./routes/serviceRoutes");

const bookingRoutes =
require("./routes/bookingRoutes");

const updateRoutes =
require("./routes/updateRoutes");

const paymentRoutes =
require("./routes/paymentRoutes");

const maintenanceRoutes =
require("./routes/maintenanceRoutes");

const dashboardRoutes =
require("./routes/dashboardRoutes");

const trackingRoutes =
require("./routes/trackingRoutes");

const chatRoutes =
require("./routes/chatRoutes");

const workerRoutes =
require("./routes/workerRoutes");

const reviewRoutes =
require("./routes/reviewRoutes");


// APP

const app = express();

app.use(cors());

app.use(express.json());


// HTTP SERVER

const httpServer =
http.createServer(app);


// SOCKET.IO

const io = new Server(
  httpServer,

  {
    cors: {

      origin:
        "http://localhost:5173",

      methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
      ],
    },
  }
);


// ===============================
// SOCKET CONNECTION
// ===============================

io.on(
  "connection",

  (socket) => {

    console.log(
      "Socket Connected:",
      socket.id
    );


    // ===============================
    // JOIN BOOKING ROOM
    // ===============================

    socket.on(

      "join-booking-room",

      ({ bookingId }) => {

        socket.join(
          bookingId
        );

        console.log(
          `Joined Room: ${bookingId}`
        );
      }
    );


    // ===============================
    // LIVE LOCATION UPDATE
    // ===============================

    socket.on(

      "worker-location-update",

      (data) => {

        console.log(
          "Location Update:",
          data
        );

        // SEND ONLY TO ROOM

        io.to(
          data.bookingId
        ).emit(

          "location-updated",

          data
        );
      }
    );


    // ===============================
    // CHAT MESSAGE
    // ===============================

    socket.on(

      "send-message",

      (messageData) => {

        console.log(
          "Chat Message:",
          messageData
        );

        // SEND MESSAGE
        // ONLY TO BOOKING ROOM

        io.to(
          messageData.bookingId
        ).emit(

          "receive-message",

          messageData
        );
      }
    );


    // ===============================
    // DISCONNECT
    // ===============================

    socket.on(

      "disconnect",

      () => {

        console.log(
          "Socket Disconnected:",
          socket.id
        );
      }
    );
  }
);


// ===============================
// API ROUTES
// ===============================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/services",
  serviceRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);

app.use(
  "/api/updates",
  updateRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/maintenance",
  maintenanceRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/tracking",
  trackingRoutes
);

app.use(
  "/api/chat",
  chatRoutes
);

app.use(
  "/api/workers",
  workerRoutes
);

app.use(
  "/api/reviews",
  reviewRoutes
);


// TEST ROUTE

app.get(
  "/",

  (req, res) => {

    res.send(
      "Server Running Successfully"
    );
  }
);


// ===============================
// MONGODB
// ===============================

mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "MongoDB Connected"
  );
})

.catch((err) => {

  console.log(err);
});


// ===============================
// START SERVER
// ===============================

const PORT =
  process.env.PORT || 5000;

httpServer.listen(

  PORT,

  () => {

    console.log(
      `Server running on port ${PORT}`
    );
  }
);