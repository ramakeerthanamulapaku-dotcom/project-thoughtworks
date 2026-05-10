const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection",(socket)=>{
  console.log(" user connected",socket.id);

  socket.on("worker-location",(data)=>{
    console.log("location recevied",data);

    io.emit(`track-worker-${data.workerId}`,data);
    });

  socket.on("disconnect",()=>{
    console.log("user disconnected",socket.id);
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/updates", require("./routes/updateRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/maintenance", require("./routes/maintenanceRoutes"));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  app.get('/',(req,res)=>{
  res.send("chusko bey");
});




const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log("Server running on port "+PORT));

