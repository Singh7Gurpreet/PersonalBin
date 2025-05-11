import React from "react";

export default function FileDownload({link}) {
  return (
    <>
    <h1>File to download from <a href={link}><button>Download</button></a></h1>
    </>
  );
}