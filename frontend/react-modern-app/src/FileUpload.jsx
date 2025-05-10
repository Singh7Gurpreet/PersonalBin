import React from "react";
import axios from "axios";

export default function FileUpload() {

  const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);

  // Convert buffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  
  const res = await axios.post(
  "http://localhost:3000/api/fileHash",
  { hash: hashHex },
  { withCredentials: true }
);
  console.log(res);
};


  return (
    <>
    <div>
      <input type="file" onChange={handleFileChange}/>
    </div>
    </>
  )
}