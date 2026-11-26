const mongoose = require('mongoose');

// Mongoose Schema for Incident / Road Hazard Management
const incidentSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: () => Date.now()
    },
    name: {
        type: String,
        required: [true, 'Please provide an incident / locality name'],
        trim: true
    },
    coords: {
        type: [Number],
        required: [true, 'Coordinates [lat, lng] are required'],
        validate: {
            validator: (v) => Array.isArray(v) && v.length === 2 && !isNaN(v[0]) && !isNaN(v[1]),
            message: 'Coordinates must be an array of two numbers [latitude, longitude]'
        }
    },
    risk: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    type: {
        type: String,
        default: 'General Urban Road Hazard',
        trim: true
    },
    category: {
        type: String,
        default: 'Accident Blackspot',
        trim: true
    },
    road: {
        type: String,
        default: 'Moderate'
    },
    traffic: {
        type: String,
        default: 'Moderate'
    },
    accidents: {
        type: Number,
        default: 0,
        min: [0, 'Accidents count cannot be negative']
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            if (!ret.id) ret.id = ret._id.toString();
            return ret;
        }
    }
});

module.exports = mongoose.model('Incident', incidentSchema, 'incidents');
