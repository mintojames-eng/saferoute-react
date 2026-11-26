const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/saferoute';
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log(`[SafeRoute Express] 🍃 MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    } catch (error) {
        console.error(`[SafeRoute Express Error] MongoDB Connection Failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
