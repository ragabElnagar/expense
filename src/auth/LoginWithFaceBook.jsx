import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, faceProvider } from "../fireBaseConfig";

function LoginWithFaceBook() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");

  const signWithGoogle = async () => {
    signInWithPopup(auth, faceProvider)
      .then((result) => {
        setName(result.user.displayName);
        setEmail(result.user.email);
        setProfile(result.user.photoURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={signWithGoogle}>login with facebook</button>
      <div>
        <h1>{name}</h1>
        <h1>{email}</h1>
        <img src={profile} alt="no" />
      </div>
    </div>
  );
}

export default LoginWithFaceBook;
