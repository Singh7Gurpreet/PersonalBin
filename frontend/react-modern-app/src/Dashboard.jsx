import { useEffect, useState } from "react";
import axios from "axios";
import FileDownload from "./FileDownload";
import FileUpload from "./FileUpload";

export default function Dashboard() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const data = await axios.get("http://localhost:3000/api/file", {
          withCredentials: true,
        });
        console.log(data);
        setStatus("found");
      } catch (error) {
        if (error.response?.status === 404) {
          setStatus("not_found");
        } else {
          console.error("Unhandled error:", error);
        }
      }
    };

    fetchFile();
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "found") return <FileDownload link="http://localhost:3000/api/file" />;
  if (status === "not_found") return <FileUpload />;
}
