const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
// installer multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get("/", function (req, res) {
  res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file" />
      <br />
      <button type="submit">Upload</button>
    </form>
  `);
});

app.post("/upload", upload.single("file"), function (req, res) {
  res.send("File uploaded successfully.");
});

app.listen(3000, function () {
  console.log("File upload app listening on port 3000!");
});
