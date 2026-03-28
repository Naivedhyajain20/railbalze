async function handleUpload(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://127.0.0.1:5000/upgrade", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Upload response:", data);

    alert(data.message); // ✅ shows "CSV upgraded successfully"
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Upload failed");
  }
}
