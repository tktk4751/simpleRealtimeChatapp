import React, { useState } from "react";
import "./App.css";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMassage = async () => {
    if (message !== "") {
      const messageData = {
        message: message,
        author: username,
        room: room,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList([...messageList, messageData]);
      setMessage("");
    }
  };

  socket.on("receive_message", (data) => {
    setMessageList([...messageList, data]);
  });

  return (
    <div chat-window>
      <div className="chat-header">
        <p>chat</p>
      </div>
      <div className="chat-body">
        <div class="card">
          {messageList.map((messageContent) => (
            <div className="messagecontent">
              <p>{messageContent.message}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          autocomplete="off"
          name="text"
          class="input"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          type="submit"
          className="chatInputButton"
          onClick={() => sendMassage()}
        >
          <span>👈</span>
        </button>
      </div>
    </div>
  );
}

export default Chat;
