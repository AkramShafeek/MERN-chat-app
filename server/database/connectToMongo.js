const mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

module.exports = connectToMongo;