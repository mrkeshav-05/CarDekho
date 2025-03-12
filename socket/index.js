import { Server } from "socket.io";

const io = new Server(10000,{ 
    cors: {
        origin:"https://carsaathi-carpool.netlify.app"//react application http
    }
});

let users = []

const addUser = (userId,socketId)=>{
    //if user doesn't already exist in the array
    if(!users.some((user)=>user.userId==userId)){
       //push into users array
       users.push({userId,socketId});
    } 

}

const removeUser = (socketId)=>{
    //socketId is different for different users
    users = users.filter((user)=>user.socketId !== socketId)
}

const getUser = (userId)=>{
    return users.find(user=>user.userId === userId)
}

io.on("connection", (socket) => {
  console.log("a user connected")
//   io.emit("welcome","you are talking to the socket server")

  //take userId and socketId from user
   socket.on("addUser",(userId)=>{
      addUser(userId,socket.id);
      console.log(users)
      io.emit("getUsers",users);
   })

   //send and get message
   socket.on("sendMessage",({senderId,receiverId,text})=>{
    const user=getUser(receiverId)
       io.to(user?.socketId).emit("getMessage",{
          senderId,
          text
       })
   })

   //when disconnected
   socket.on("disconnect",()=>{
     console.log("a user disconnected!");
     removeUser(socket.id);
     io.emit("getUsers",users); 
   })

});