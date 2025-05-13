import React from "react";
import axios from "axios";

export default function FileDownload({link}) {
  const handleDownloadButton = async (event) => {
    const res = await axios.delete("http://localhost:3000/api/file",{withCredentials:true});
    window.location.href = "https://localhost:3001/dashboard";
  };

  return (
    <>
    <h1>File to download from <a href={link} onClick={handleDownloadButton}><button>Download</button></a></h1>
    </>
  );
}