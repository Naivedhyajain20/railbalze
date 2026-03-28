async function handleOptimize(filePath) {
  try {
    const response = await fetch("http://127.0.0.1:5000/optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: filePath }), // 👈 backend expects JSON with key "file"
    });

    const data = await response.json();
    console.log("Optimize response:", data);

    alert(data.message); // ✅ shows "Schedule optimized successfully"
  } catch (error) {
    console.error("Error optimizing:", error);
    alert("Optimization failed");
  }
}
