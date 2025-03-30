import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import { auth } from "../pages/firebase";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

const userSocketMap = {}; // {userId: socketId}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    const [onlineUsers, setOnlineUsers] = useState([]);
    useEffect(() => {
        if (user) {
            const socket = io("http://localhost:8000", {
                query: {
                    userId: user._id,
                },
            });
            setSocket(socket);
            console.log("hi");

            // socket.on() is used to listen to the events. can be used both on client and server side
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
