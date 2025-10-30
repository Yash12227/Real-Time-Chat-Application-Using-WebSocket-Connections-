import React, { useState } from "react";
import Chat from "./Chat";

function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (username.trim()) setJoined(true);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {!joined ? (
        <div>
          <h2>💬 Enter Chat Room</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleJoin}>Join</button>
        </div>
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

export default App;
