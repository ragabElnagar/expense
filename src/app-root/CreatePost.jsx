import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../fireBaseConfig";
import { useNavigate } from "react-router-dom";


function CreatePost(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const dbRef = collection(db,"posts");

  const createPost = async () => {
    await addDoc(dbRef, {
      title,
      description,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/")
  };
  return (
    <div>
      <div>
        <label>title</label>
        <input
          placeholder="title....."
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>description</label>
        <textarea
          placeholder="description....."
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button onClick={createPost}>submit</button>
    </div>
  );
}

export default CreatePost;
