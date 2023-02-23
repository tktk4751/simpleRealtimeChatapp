import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io("http://localhost:3000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChat">
          <h3 className="h3Title">Join Chat🚀</h3>
          <input
            type="text"
            className="textbox"
            placeholder="Name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="textbox"
            placeholder="RoomID"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Now</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
