import React, { useRef } from "react";

function Room({ setRoom }) {
  const inputRef = useRef();
  return (
    <div>
      <input placeholder="enter room ..." ref={inputRef} />
      <button onClick={() => setRoom(inputRef.current.value)}>Enter Chat</button>
    </div>
  );
}

export default Room;
