const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const auth = require('./auth');
const { User, Land, Booking } = require('./models');

dotenv.config();
const app = express();
app.use(express.json());


// Import the routes
const userRoutes = require('./routes/userRoutes');
const landRoutes = require('./routes/landRoutes');

// Use the routes
app.use('/api/auth', userRoutes);
app.use('/api/lands', landRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

    // Add this in index.js, before app.listen
app.get('/', (req, res) => {
    res.send('Welcome to the Land Maintenance API! Server is up and running.');
});

// --- AUTH ROUTES ---

app.post('/api/auth/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name, role } });
});

// --- LAND ROUTES ---

app.get('/api/auth/register',(req,res)=>{
  res.send('vachindi raaa .. pani chusko bey...');
});

app.post('/api/lands', auth, async (req, res) => {
    const newLand = new Land({ ...req.body, owner: req.user.id });
    const savedLand = await newLand.save();
    res.json(savedLand);
});

app.get('/api/lands', auth, async (req, res) => {
    const lands = await Land.find({ owner: req.user.id });
    res.json(lands);
});

// --- BOOKING ROUTES ---

app.post('/api/bookings', auth, async (req, res) => {
    const { landId, serviceType, scheduledDate } = req.body;
    const newBooking = new Booking({
        land: landId,
        owner: req.user.id,
        serviceType,
        scheduledDate
    });
    await newBooking.save();
    res.json(newBooking);
});

// Update Booking Status (For Providers/Admins)
app.patch('/api/bookings/:id', auth, async (req, res) => {
    if (req.user.role === 'owner') return res.status(403).json({ msg: "Unauthorized" });
    
    const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id, 
        { status: req.body.status }, 
        { new: true }
    );
    res.json(updatedBooking);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));