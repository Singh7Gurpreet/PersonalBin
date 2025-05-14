import axios from "axios";

export default function FileUpload() {
  let file = null;
  let uploadUrl = null;

  const handleFileChange = async (e) => {
    file = e.target.files[0];
    if (!file) return;

    try {
      const res = await axios.post("https://personalbin.onrender.com/api/file", {
        fileName: file.name,
        fileType: file.type
      },{withCredentials:true});
      uploadUrl = res.data.link;
    } catch (err) {
      console.error("Error getting upload URL:", err);
    }
  };

  const handleUploadClick = async () => {
    if (!file || !uploadUrl) {
      alert("Select a file first");
      return;
    }

    try {
      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });
      alert("File uploaded");
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div>
      <h2>Simple Upload to S3</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}
