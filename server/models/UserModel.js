const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    pic: {
        type: String,
        default: `http://localhost:${process.env.PORT || 3001}/assets/user-avatar.png`,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;