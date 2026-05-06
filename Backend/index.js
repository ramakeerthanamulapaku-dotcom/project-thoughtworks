const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/updates", require("./routes/updateRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  app.get('/',(req,res)=>{
  res.send("chusko bey");
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port "+PORT));

