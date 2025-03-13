import Conversation from  "../models/Conversation.js"

//New Conversation
export const newConversation = async(req,res)=>{
    console.log(req.body);
    const newConvo = new Conversation({
        members: [req.body.senderId,req.body.receiverId],
    });
    try{
        const savedConvo = await newConvo.save();
        res.status(200).json(savedConvo)
    }catch(err){
        res.status(500).json(err)
    }
}

//get conversation of user
export const getConversation = async(req,res)=>{
    try{
        console.log("hi")
        const convo = await Conversation.find({
            members: {$in:req.params.userId}
        });
        console.log(convo)
        res.status(200).json(convo)
    }catch(err){
        res.status(500).json(err);
    }
}
