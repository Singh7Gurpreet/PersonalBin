import axios from "axios";

export default function FileDownload({link}) {
  const handleDownloadButton = async (event) => {
    const res = await axios.delete("https://personalbin.onrender.com/api/file",{withCredentials:true});
    window.location.href = "https://personalbinfrontend.onrender.com/dashboard";
  };

  return (
    <>
    <h1>File to download from <a href={link} onClick={handleDownloadButton}><button>Download</button></a></h1>
    </>
  );
}