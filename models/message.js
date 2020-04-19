const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
    message: { type: String },
    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    },
    senderName: { type: String },
    recieverName: { type: String },
    isRead: {
        type: Boolean, default: false
    },
    createdAt: {
        type: Date, default: Data.now
    }
})

module.exports = mongoose.model("message", messageSchema);
