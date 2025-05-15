import React from "react";
import axios from "axios";

export default function FileDownload({link}) {
  const apiUrl = import.meta.env;
  const handleDownloadButton = async (event) => {
    const res = await axios.delete(`${apiUrl.VITE_BACKEND_URL}/api/file`,{withCredentials:true});
    window.location.href = `${apiUrl.VITE_FRONTEND_URL}/dashboard`;
  };

  return (
    <>
    <h1>File to download from <a href={link} onClick={handleDownloadButton}><button>Download</button></a></h1>
    </>
  );
}