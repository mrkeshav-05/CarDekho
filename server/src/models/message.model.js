import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    conversationId: {
        type: mongoose.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["sent", "delivered", "read"],
        default: "sent"
    },
    tripId: {
        type: mongoose.Types.ObjectId,
        ref: "Trip",
        default: null
    }
}, { timestamps: true });

export default mongoose.model("Message", messageSchema)