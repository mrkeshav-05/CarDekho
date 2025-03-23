import React, { useState,useEffect, useRef } from 'react'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
  TypingIndicator,
  MessageSeparator,
  VoiceCallButton,
  Conversation,
  ConversationList,
  Loader
} from "@chatscope/chat-ui-kit-react";
import axios from 'axios';
import { ConversationListItem } from '../../components/Conversation/ConversationListItem';
import Navbar from '../../components/Navbar/Navbar';
import { MessageItem } from '../../components/Conversation/MessageItem';
import {io} from "socket.io-client"

export const Messenger = ({user,currentChat,setCurrentChat, setIsLoggedIn}) => {
    const [conversations,setConversations] = useState([])
    const [messages,setMessages] = useState([])
    const [newMessage,setNewMessage] = useState("")
    const [arrivalMessage,setArrivalMessage] = useState(null)
    const [receiver,setReceiver] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([])
    const [isOnline,setIsOnline] = useState(false)
    const [isLoaded,setIsLoaded] = useState(false)
    const [isLoading,setIsLoading] = useState(true)//Loading of main page

    //using Reference to socket to avoid using useEffect again and again
    const socket = useRef()
    const scrollRef = useRef()

    console.log(conversations)
    console.log("Current chat",currentChat)
    
    // To fetch receiver's data
    useEffect(()=>{
        const friendId = currentChat?.members?.find(m=> m !== user._id)
        console.log(friendId)
        const getUser = async()=>{
            try{
                const res= await axios("https://car-saathi.onrender.com/api/user/getUser/"+friendId);
                // console.log('friend is here',res.data)
                setReceiver(res.data.user.name)

            }catch(err){
               console.log(err)
            }
        }
        getUser()
    },[currentChat])

    // Connecting to socket and receiving message
    useEffect(()=>{
        socket.current = io("https://car-saathi-socket.onrender.com")
        socket.current.on("getMessage",data=>{
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    },[])
 
    // For updating messages array when a real time message is received
    useEffect(()=>{
       arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
       setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat])


    // To add current user to the room and get list of all users in the room
    useEffect(()=>{
        socket.current.emit("addUser",user._id)
        socket.current.on("getUsers",users=>{
            console.log("Online users",users)
            setOnlineUsers(users)
        })
    },[user])
    console.log(socket)

    // To get all conversations of the user 
    useEffect(()=>{
        const getConversations = async()=>{
            try{
            const res = await axios.get("https://car-saathi.onrender.com/api/conversation/getConversation/"+user._id)
            setConversations(res.data)
            setIsLoading(false)
            console.log("conversations",res.data);
            }catch(err){
                console.log(err)
            }
        }
        getConversations()
    },[user._id])

    // To fetch messages of current chat
    useEffect(()=>{
        const getMessages = async() =>{
            try{
                const res = await axios.get("https://car-saathi.onrender.com/api/message/"+currentChat._id)
                setMessages(res.data)
                setIsLoaded(true)
            }catch(err){
                console.log(err)
            }
        }
        getMessages()
    },[currentChat])


    useEffect(()=>{
        scrollRef?.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    console.log(messages)

    //To get online status of people
    useEffect(() => {
        const friendId = currentChat?.members?.find(m => m !== user._id);
        if (friendId) {
          const isFriendOnline = onlineUsers.some(user => user?.userId === friendId);
          setIsOnline(isFriendOnline);
        }
      }, [currentChat, onlineUsers, user._id]);

    //Function to send message
    const handleSubmit = async(e)=>{
        // e.preventDefault();
        const msg = {
            sender: user._id,
            conversationId: currentChat._id,
            text: newMessage
        }

        const receiverId = currentChat.members.find(member => member!=user._id)
        
        socket.current.emit("sendMessage",{
            senderId: user._id,
            receiverId,
            text: newMessage
        })

        try{
            const res = await axios.post("https://car-saathi.onrender.com/api/message/",msg)
            setMessages([...messages,res.data])
            setNewMessage("")

        }catch(err){
            console.log(err)
        }

    }

    //Function to handle click on back arrow
      const handleBack = ()=>{
        setCurrentChat(null)
      }
  return (
    <div>
        <Navbar user={user} setIsLoggedIn={setIsLoggedIn} />
        {!isLoading ? (<div style={{ position: "relative", height: "90vh" }}>
         <MainContainer>
          <ConversationList>
            {conversations?.map((c)=>{
                 return <div onClick={()=>setCurrentChat(c)}><ConversationListItem conversation={c} user={user} onlineUsers={onlineUsers}/></div>
            })} 
          </ConversationList>
            { currentChat ? isLoaded ? (
                        <>
            <ChatContainer style={{height: '600px', width:'full'}}>
                <ConversationHeader>
                    <ConversationHeader.Back onClick={handleBack}/>
                    <Avatar
                    name={receiver}
                    src={`https://ui-avatars.com/api/?name=${receiver}&background=random`}
                    status = {isOnline ? "available" : "unavailable"}
                    />
                    <ConversationHeader.Content
                        info={isOnline ? "Online" : "Offline"}
                        userName={receiver}
                    />
                </ConversationHeader>

                <MessageList>
                    {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
                    {
                        messages.map((m)=>(
                            <div ref={scrollRef}>
                            <MessageItem message={m} own={user._id===m.sender}/>
                            </div>
                        ))
                    }
                    </MessageList>

                <MessageInput
                    placeholder="Type message here"
                    attachButton='false'
                    value={newMessage}
                    onChange={(innerText) => {
                        console.log(innerText);
                        setNewMessage(innerText);
                    }}
                    onSend={handleSubmit}
                />
            </ChatContainer>
            </>
        ):
        <Loader/>
         : (
            <div className='flex justify-center w-full items-center bold text-gray-300 text-3xl'>Open a chat to start a conversation</div>
        )
    }
    </MainContainer>
    </div>) : 
    <Loader/>
}

    </div>
  )
}
