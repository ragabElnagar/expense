import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import Login from "./Login";
import Nav from "./Nav";

function AppRoot(props) {
    const [isAuth,setIsAuth]=useState(localStorage.getItem("isAuth"))

  return (
    <Router>
        <Nav isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default AppRoot;
