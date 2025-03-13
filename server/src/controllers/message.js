import Message from  "../models/Message.js"

//New Conversation
export const newMessage = async(req,res)=>{
    const newMsg = new Message(req.body)
    try{
        const savedMsg = await newMsg.save();
        res.status(200).json(savedMsg)
    }catch(err){
        res.status(500).json(err)
    }
}

//get
export const getMessages = async(req,res)=>{
    try{
        const messages = await Message.find({
            conversationId:req.params.conversationId
        });
        res.status(200).json(messages)
    }catch(err){
        res.status(500).json(err);
    }
}
