const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Test = mongoose.model("Test", testSchema);

module.exports = Test;