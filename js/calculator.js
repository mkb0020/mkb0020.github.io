document.getElementById("downloadBtn").addEventListener("click", () => {
  const fileUrl = "assets/templates/template.xlsx";

  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "template.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    alert("Upload Successful 🎉");
  }
});