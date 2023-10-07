import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../fireBaseConfig";

function Login({ setIsAuth }) {
  const signWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        localStorage.setItem("token", result.user.refreshToken);
        setIsAuth(result.user.refreshToken);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={signWithGoogle}>login with google</button>
    </div>
  );
}

export default Login;
