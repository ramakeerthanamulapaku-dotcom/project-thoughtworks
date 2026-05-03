const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['owner', 'provider', 'admin'], default: 'owner' }
});

// Land Schema
const LandSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    address: String,
    sizeAcres: Number,
    coordinates: {
        lat: Number,
        lng: Number
    },
    landType: String // e.g., Agricultural, Residential
});

// Booking Schema
const BookingSchema = new mongoose.Schema({
    land: { type: mongoose.Schema.Types.ObjectId, ref: 'Land' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    serviceType: String,
    status: { type: String, enum: ['pending', 'active', 'completed'], default: 'pending' },
    scheduledDate: Date
});

module.exports = {
    User: mongoose.model('User', UserSchema),
    Land: mongoose.model('Land', LandSchema),
    Booking: mongoose.model('Booking', BookingSchema)
};