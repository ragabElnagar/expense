import React, { useEffect, useState } from "react";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { storage } from "../fireBaseConfig";

function UploadImage() {
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageRefList = ref(storage, `images/`);

  const handelUpload = () => {
    if (image !== null) {
      const imageRef = ref(storage, `images/${image.name}`);
      uploadBytes(imageRef, image).then((res) => {
        getDownloadURL(res.ref).then((file) => {
          setImageList((prv) => [{ file: file, name: res.ref.name },...prv]);
        });
      });
    }
  };

  const getAllImage = () => {
    listAll(imageRefList).then((res) => {
      res.items.map((ele) => {
        getDownloadURL(ele).then((file) => {
          setImageList((prv) => [...prv,{ file: file, name: ele.name }]);
        });
      });
    });
  };

  const handelDelete = (image) => {
    const imageRefDelete = ref(storage, `images/${image}`);
    deleteObject(imageRefDelete).then(() => {
        setImageList([])
      getAllImage();
    });
  };

  console.log(imageList)
  useEffect(() => {
    getAllImage();
  }, []);

  console.log(imageList)
  return (
    <div>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handelUpload}>upload</button>
      {imageList.length===0?<div>loading !!!</div>
      :imageList.map((item, index) => {
        return (
          <div key={index}>
            <img src={item.file} />
            <button onClick={() => handelDelete(item.name)}>delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default UploadImage;
