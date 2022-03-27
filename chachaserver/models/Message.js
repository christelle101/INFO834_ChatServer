const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId, 
        required: "Chattroom is required !",
        ref: "Chatroom",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: 'Chattroom is required !',
        ref: "User",
    },
    message: {
        type: String, 
        required: 'Message is required !'
    }
});

module.exports = mongoose.model("Message", messageSchema);