import React, { useState } from "react";

// const users = [
//     { id: 1, name: "Alice" },
//     { id: 2, name: "Bob" },
//     { id: 3, name: "Charlie" },
// ];

const Messenger = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState({});
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages((prev) => ({
            ...prev,
            [selectedUser.id]: [...(prev[selectedUser.id] || []), { text: input, sender: "me" }],
        }));
        setInput("");
    };

    return (
        <div className="flex h-screen">
            {/* People Section */}
            <div className="w-1/3 bg-gray-100 p-4 border-r">
                <h2 className="text-lg font-semibold mb-4">People</h2>
                <ul>
                    {/* {users.map((user) => (
                        <li
                            key={user.id}
                            className={`p-2 cursor-pointer rounded-lg ${selectedUser?.id === user.id ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                                }`}
                            onClick={() => setSelectedUser(user)}
                        >
                            {user.name}
                        </li>
                    ))} */}
                </ul>
            </div>

            {/* Messages Section */}
            <div className="w-2/3 flex flex-col p-4">
                {selectedUser ? (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Chat with {selectedUser.name}</h2>
                        <div className="flex-1 overflow-y-auto border p-4 rounded-lg bg-gray-50">
                            {messages[selectedUser.id]?.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`mb-2 p-2 rounded-lg w-fit ${msg.sender === "me" ? "bg-blue-500 text-white self-end" : "bg-gray-300"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex">
                            <input
                                type="text"
                                className="flex-1 border p-2 rounded-lg"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <button
                                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={sendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500 text-center flex-1 flex items-center justify-center">
                        No messages yet
                    </p>
                )}
            </div>
        </div>
    );
};

export default Messenger;
