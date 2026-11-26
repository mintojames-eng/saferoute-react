const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/saferoute';
    try {
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 4000
        });
        console.log(`[SafeRoute Express] 🍃 MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    } catch (error) {
        console.error(`\n======================================================`);
        console.error(`[SafeRoute Express Error] MongoDB Connection Failed!`);
        console.error(`Reason: ${error.message}`);
        console.error(`------------------------------------------------------`);
        console.error(`👉 HOW TO FIX:`);
        console.error(`   MongoDB is not running on port 27017.`);
        console.error(`   1. Double-click 'start_mongodb.bat' in the project folder.`);
        console.error(`   2. Or run: mongod --dbpath "C:\\Users\\minto\\mongodb_data"`);
        console.error(`======================================================\n`);
    }
};

module.exports = connectDB;
