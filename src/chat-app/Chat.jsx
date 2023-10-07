import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../fireBaseConfig";
import "./style.css"

function Chat({ room }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const dbRef = collection(db, "chat");

  const handelSendMessage = async (e) => {
    e.preventDefault();
    if (message !== "") {
      await addDoc(dbRef, {
        message,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    const queryMessage = query(
      dbRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsub = onSnapshot(queryMessage, (snapShot) => {
      let message = [];
      snapShot.forEach((ele) => {
        message.push({ ...ele.data(), id: ele.id });
      });
      setMessages(message);
      return () => unsub();
    });
  }, []);

  return (
<div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.message}
          </div>
        ))}
      </div>
      <form onSubmit={handelSendMessage} className="new-message-form">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
