import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../fireBaseConfig";
import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

function Auth(props) {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const login = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const authInfo = {
      name: result.user.displayName,
      userId: result.user.uid,
      profile:result.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/expense-tracker");
    }
  }, []);

  return (
    <div className="flex h-screen bg-slate-200">
      <button className="m-auto border-solid border-2 bg-white border-black text-lg font-bold p-2 rounded-md" onClick={login}>loginWithGoogle</button>
    </div>
  );
}

export default Auth;
