const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    id: String,
    title: { type: String, required: true },
    severity: { type: String, default: 'Medium' },
    category: { type: String, default: 'Road Obstacle' },
    location: String,
    coords: [Number],
    timestamp: { type: String, default: 'Just now' },
    verifiedCount: { type: Number, default: 0 },
    isVerifiedByUser: { type: Boolean, default: false },
    status: { type: String, default: 'Active' },
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Alert', alertSchema, 'alerts');
