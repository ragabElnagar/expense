import React, { useState } from "react";
import Login from "./Login";
import Room from "./Room";
import Chat from "./Chat";
import { signOut } from "firebase/auth";
import { auth } from "../fireBaseConfig";

function ChatApp(props) {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  const [room, setRoom] = useState(null);

  const sinOut = () => {
    signOut(auth);
    localStorage.clear();
    setIsAuth("");
    setRoom(null);
  };
  return (
    <div>
      {isAuth ? (
        <div>
          {room ? <Chat room={room} /> : <Room setRoom={setRoom} />}
          <button onClick={sinOut}>sin out</button>
        </div>
      ) : (
        <Login setIsAuth={setIsAuth} />
      )}
    </div>
  );
}

export default ChatApp;
