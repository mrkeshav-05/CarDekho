import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';
// import { getReceiverSocketId, io} from '../socket/socket.js';

const getReceiverSocketId = (hi) => {
	return 'hi';
}
//New Conversation
export const sendMessages = async (req, res) => {
	try {
		const { senderId, receiverId, text } = req.body;

		const conversation = await Conversation.findOne({
			participants: { 
				$all: [senderId, receiverId]
			}
		});

		if (!conversation) {
			conversation = new Conversation({
				participants: [senderId, receiverId]
			});
			await conversation.save();
		}

		const message = new Message({
			senderId,
			receiverId,
			text,
			conversationId: conversation._id
		});
		await message.save();
		conversation.lastMessage = text;
		await conversation.save();

		res.status(200).json(message);
	} catch (error) {

	}
}

//get
export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const getUserForSidebar = async (req, res) => {
	try {
		const senderId = req.user._id;

		const conversations = await Conversation.find({
			participants: { $in: [senderId] },
		}).populate("participants");

		const users = conversations.map((conversation) => {
			const participant = conversation.participants.find(
				(participant) => participant._id.toString() !== senderId.toString()
			);
			return participant;
		});

		res.status(200).json(users);
	} catch (error) {
		console.log("Error in getUserForSidebar controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}