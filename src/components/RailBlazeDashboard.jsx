import React, { useState } from "react";

export default function RailBlazeDashboard() {
  const [filePath, setFilePath] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Upload CSV
  async function handleUpload(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upgrade", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResponseMessage(data.message);
      if (data.output_file) setFilePath(data.output_file);
    } catch (error) {
      console.error(error);
      setResponseMessage("Upload failed");
    }
  }

  // Optimize CSV
  async function handleOptimize() {
    if (!filePath) return alert("Upload a CSV first!");
    try {
      const response = await fetch("http://127.0.0.1:5000/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: filePath }),
      });
      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error(error);
      setResponseMessage("Optimization failed");
    }
  }

  return (
    <div>
      <h1>🚂 RailBlaze Dashboard</h1>
      <input type="file" accept=".csv" onChange={(e) => handleUpload(e.target.files[0])} />
      <button onClick={handleOptimize}>Optimize CSV</button>
      {responseMessage && <div>{responseMessage}</div>}
      {filePath && <div>Current file: {filePath}</div>}
    </div>
  );
}
