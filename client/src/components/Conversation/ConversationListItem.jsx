import React, { useEffect,useState } from 'react'
import {
    Conversation,
    Avatar,
    Loader
} from "@chatscope/chat-ui-kit-react";
import axios from "axios"

export const ConversationListItem = ({conversation,user,onlineUsers}) => {
    const [usr,setUsr] = useState(null)
    const [messages,setMessages] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    console.log('Conversation',conversation);
    console.log("messages",messages)

    // Fetching details of the receiver
    useEffect(()=>{
        const friendId = conversation.members.find(m=> m !== user._id)
        // console.log(friendId)
        const getUser = async()=>{
            try{
                const res= await axios("https://car-saathi.onrender.com/api/user/getUser/"+friendId);
                console.log(res.data.user)
                setUsr(res.data.user)
                setIsLoaded(true)

            }catch(err){
               console.log(err)
            }
        }
        getUser()
    },[])

    // Fetching all messages of the conversation
    useEffect(()=>{
      const getMessages = async() =>{
          try{
              const res = await axios.get("https://car-saathi.onrender.com/api/message/"+conversation._id)
              setMessages(res.data)
          }catch(err){
              console.log(err)
          }
      }
      getMessages()
  },[])

    //Finding the last sent message and its sender
    const lastmsg = messages[messages.length-1]
    let lastsender;
    if(lastmsg?.sender==user?._id){
        lastsender = user?.name
    }else{
      lastsender = usr?.name
    }

    //Finding status of the user
    const isOnline = onlineUsers.some(user=>user?.userId === usr?._id)
    console.log(usr);

    return (
    <div>
      {isLoaded ? (
      <Conversation
      info={lastmsg?.text}
      lastSenderName={lastmsg && lastsender}
      name={usr?.name}
      >
      <Avatar
        name={usr?.name}
        src={`https://ui-avatars.com/api/?name=${usr?.name}&background=random`} 
        status = {isOnline ? "available" : "unavailable"}
     />
    </Conversation>
      ) : <Loader/>
      }
        
    </div>
  )
}
