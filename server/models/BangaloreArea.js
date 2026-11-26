const mongoose = require('mongoose');

const bangaloreAreaSchema = new mongoose.Schema({
    id: String,
    name: { type: String, required: true },
    zone: { type: String, required: true },
    coords: { type: [Number], required: true },
    risk: { type: String, default: 'Medium' },
    type: String,
    road: String,
    traffic: String,
    accidents: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('BangaloreArea', bangaloreAreaSchema, 'bangalore_areas');
