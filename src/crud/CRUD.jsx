import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../fireBaseConfig";

const CRUD = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const getUserDataRef = collection(db, "users");

  const getUsers = async () => {
    const data = await getDocs(getUserDataRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getUsers();
  }, []);

  const addUser = async () => {
    addDoc(getUserDataRef, { name, age });
    getUsers();
  };

  const updateUser = async (data) => {
    const userDoc = doc(db, "users", data.id);
    const newName = name.length > 0 ? name : data.name;
    const newAge = age.length > 0 ? age : data.age;
    const newData = { ...data, name: newName, age: newAge };
    updateDoc(userDoc, newData);
    getUsers();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    deleteDoc(userDoc);
    getUsers();
  };
  return (
    <div>
      <input
        placeholder="name....."
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="age....."
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={addUser}>addUser</button>
      {users.map((ele, index) => {
        return (
          <div key={index}>
            <h1>name:{ele.name}</h1>
            <h1>age:{ele.age}</h1>
            <button onClick={() => updateUser(ele)}>update</button>
            <button onClick={() => deleteUser(ele.id)}>deleteDoc</button>
          </div>
        );
      })}
    </div>
  );
};

export default CRUD;
