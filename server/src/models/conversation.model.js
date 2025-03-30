import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
        type: mongoose.Types.ObjectId,
        ref: "Message",
        default: []
    }],
    lastMessage: {
        type: String,
        default: ""
    },
    tripId: {
        type: mongoose.Types.ObjectId,
        ref: "Trip",
        default: null
    }
}, { timestamps: true });

export default mongoose.model("Conversation", conversationSchema)