const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    spotifyUser: {
        type: String,
        required: true
    },
    spotifyEmail: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", UserSchema);