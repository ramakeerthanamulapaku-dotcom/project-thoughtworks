const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const dashboardRoutes = require("./routes/dashboardRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const updateRoutes = require("./routes/updateRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const workerRoutes = require("./routes/workerRoutes");  

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection",(socket)=>{
  console.log("Worker connected",socket.id);

  socket.on("worker-location",(data)=>{
    console.log("location recevied",data);

    io.emit(`track-worker-${data.workerId}`,data);
    });

    io.emit(`worker-location-${socket.id}`,{message:"hello from server"});
    io.emit("recive-location",data);

    socket.on("joinRoom",(bookingId)=>{
      socket.join(bookingId);
      console.log(`Worker joined room ${bookingId}`);
    });
    socket.on("sendMessage",(data)=>{

      console.log("message received",data);

      io.emit(`receiveMessage-${data.receiverId}`,data);
    });
  

  socket.on("disconnect",()=>{
    console.log("Worker disconnected",socket.id);
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/updates", require("./routes/updateRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/maintenance", require("./routes/maintenanceRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/tracking", require("./routes/trackingRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/workers", require("./routes/workerRoutes"));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  app.get('/',(req,res)=>{
  res.send("chusko bey");
});




const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log("Server running on port "+PORT));

