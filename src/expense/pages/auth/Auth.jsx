import React, { useEffect } from "react";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, faceProvider, googleProvider } from "../../../fireBaseConfig";
import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

function Auth(props) {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const loginWithGoogle = async () => {
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

  const loginWithFaceBook = async () => {
    await signInWithPopup(auth, faceProvider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        fetch(
          `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`
        ).then((res) => {
          const authInfo = {
            name: result.user.displayName,
            userId: result.user.uid,
            profile:res.url,
            isAuth: true,
          };
          localStorage.setItem("auth", JSON.stringify(authInfo));
          navigate("/expense-tracker");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/expense-tracker");
    }
  }, []);

  return (
    <div className="flex h-screen bg-slate-200">
      <button className="m-auto border-solid border-2 bg-white border-black text-lg font-bold p-2 rounded-md" onClick={loginWithGoogle}>loginWithGmail</button>
      <button className="m-auto border-solid border-2 bg-white border-black text-lg font-bold p-2 rounded-md" onClick={loginWithFaceBook}>loginWithFaceBook</button>
    </div>
  );
}

export default Auth;
