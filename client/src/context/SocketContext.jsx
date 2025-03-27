import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

const userSocketMap = {}; // {userId: socketId}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (user) {
            const socket = io("http://localhost:8000", {
                query: {
                    userId: user._id,
                },
            });
            setSocket(socket);

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
