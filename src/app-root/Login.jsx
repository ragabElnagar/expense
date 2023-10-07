import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../fireBaseConfig";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();
  const signWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setIsAuth(true);
        localStorage.setItem("isAuth", true);
        navigate("/");
        // setName(result.user.displayName);
        // setEmail(result.user.email);
        // setProfile(result.user.photoURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={signWithGoogle}>login with google</button>
      {/* <div>
        <h1>{name}</h1>
        <h1>{email}</h1>
        <img src={profile} alt="no" />
      </div> */}
    </div>
  );
}

export default Login;
