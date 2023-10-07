import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../fireBaseConfig";

function Home({isAuth}) {
  const dbRef = collection(db, "posts");
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getPosts = async () => {
    await getDocs(dbRef).then((res) => {
      setPosts(res.docs.map((data) => ({ ...data.data(), id: data.id })));
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    getPosts();
  };

  const updateBtn = (data) => {
    setUpdate(data.id);
    setDescription(data.description);
    setTitle(data.title);
  };
  const updatePost = async (data) => {
    const postDoc = doc(db, "posts", data.id);
    const newTitle = title.length > 0 ? title : data.title;
    const newDescription =
      description.length > 0 ? description : data.description;
    const newData = { ...data, title: newTitle, description: newDescription };
    await updateDoc(postDoc, newData);
    getPosts();
    setUpdate("");
  };

  return (
    <div>
      {posts.map((ele, index) => {
        return (
          <div key={index}>
            <div>
              <h1>{ele.title}</h1>
              <b>{ele.description}</b>
              <br />
              <b>{ele.author?.name}</b>
              <br />
              {isAuth&&ele.author.id===auth.currentUser.uid&&<button onClick={() => deletePost(ele.id)}>delete</button>}
              {isAuth&&ele.author.id===auth.currentUser.uid&& <button onClick={() => updateBtn(ele)}>updatePost</button>}
              {update === ele.id && (
                <div>
                  <input
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    placeholder="title"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <button onClick={() => updatePost(ele)}>update</button>
                </div>
              )}
            </div>
          </div>
        );
      })}{" "}
    </div>
  );
}

export default Home;
