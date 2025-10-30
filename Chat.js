import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const Chat = ({ username }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        username,
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit("send_message", newMessage);
      setMessage("");
    }
  };

  return (
    <div>
      <h3>Welcome, {username} 👋</h3>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          width: "400px",
          height: "300px",
          overflowY: "auto",
          margin: "auto",
          textAlign: "left",
        }}
      >
        {chat.map((msg, index) => (
          <div key={index}>
            <strong>[{msg.time}] {msg.username}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
