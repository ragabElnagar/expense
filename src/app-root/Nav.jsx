import { signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../fireBaseConfig";
import { useNavigate } from "react-router-dom";

function Nav({ isAuth, setIsAuth }) {
  const navigate = useNavigate();

  const sinOut = () => {
    signOut(auth).then(() => {
      setIsAuth(false);
      localStorage.clear();
      navigate("/login");
    });
  };
  return (
    <div>
      <nav>
        <Link to={"/"}>home</Link>

        {!isAuth ? (
          <Link to={"/login"}>login</Link>
        ) : (
          <div>
            <Link to={"/createPost"}>createPost</Link>
            <button onClick={sinOut}>logout</button>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Nav;
