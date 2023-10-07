import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword,onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../fireBaseConfig";

function Auth(props) {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  useEffect(()=>{
  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser);
  })
  },[])


  const register = async () => {
    try {
        const users=await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        console.log(users)
    } catch (error) {
        console.log(error)
    }
  };
  const login = async() => {
    try {
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        
    } catch (error) {
        console.log(error)
    }
  };
  const logout = async() => {
   await signOut(auth)
  };

  return (
    <div>
      <div>
        <input
          placeholder="email...."
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password...."
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>register</button>
      </div>
      <br />
      <div>
        <input
          placeholder="email...."
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password...."
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>login</button>
      </div>
      <div>
        <h1>user login is :</h1>
        <h2>{user?.email}</h2>
      </div>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Auth;
