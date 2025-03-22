import React from 'react'
import {Message,Avatar} from "@chatscope/chat-ui-kit-react"
import {format} from "timeago.js"
import { useState,useEffect } from 'react'
import axios from 'axios'
export const MessageItem = ({message,own}) => {
    // console.log(message)
    const [usr,setUsr] = useState(null)

    // Fetching details of the receiver
    useEffect(()=>{
        const getUser = async()=>{
            try{
                const res= await axios.get("https://car-saathi.onrender.com/api/user/getUser/"+message.sender);
                console.log(res.data.user,message)
                setUsr(res.data.user)

            }catch(err){
               console.log(err)
            }
        }
        getUser()
    },[message.sender])

  return (
    <div>
      {usr && (<Message
            model={{
            direction: own ? 'outgoing':'incoming',
            message: message.text,
            position: 'single',
            sender: message.sender,
            // sentTime: '15 mins ago'
          }}
      >
      <Message.Footer sentTime={format(message.createdAt)}/>
      
      <Avatar
          name={usr?.name}
          src={`https://ui-avatars.com/api/?name=${usr?.name}&background=random`}
      />
    </Message>)
    }
    </div>
  )
}
