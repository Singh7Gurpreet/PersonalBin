import { useEffect, useState } from "react";
import axios from "axios";
import FileDownload from "./FileDownload";
import FileUpload from "./FileUpload";

export default function Dashboard() {
  const [status, setStatus] = useState("loading");
  const [data,setData] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL;
        const data = await axios.get(`${apiUrl}/api/file`, {
          withCredentials: true,
        });
        setData(data.data);
        setStatus("found");
      } catch (error) {
        if (error.response?.status === 404) {
          setStatus("not_found");
        }
      }
    };

    fetchFile();
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "found") return <FileDownload link={data.link} />;
  if (status === "not_found") return <FileUpload />;
}
