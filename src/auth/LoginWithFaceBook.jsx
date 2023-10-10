import React, { useState } from "react";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, faceProvider } from "../fireBaseConfig";

function LoginWithFaceBook() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");

  const signWithFacebook = async () => {
    await signInWithPopup(auth, faceProvider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        fetch(
          `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`
        ).then((res) => {
          setProfile(res.url);
        });
        setName(result.user.displayName);
        setEmail(result.user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={signWithFacebook}>login with facebook</button>
      <div>
        <h1>{name}</h1>
        <h1>{email}</h1>
        <img src={profile} alt="no" />
      </div>
    </div>
  );
}

export default LoginWithFaceBook;
