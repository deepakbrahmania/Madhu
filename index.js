const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./upload");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".xml");
  }
});
const upload = multer({
  storage: storage
}).single("fileUpload");

require("dotenv").config({ path: "./config" });

const app = express();
// app.use(express.static(path.resolve(__dirname + "/upload")));
app.use(cors());

app.post("/uploadxml", upload, (req, res) => {
  var spawn = require("child_process").spawn;
  var process = spawn("python", [
    "./script/hello.py",
    req.file.filename,
    req.file.originalname
  ]);
  process.stdout.on("data", data => res.json(data.toString()));
});
app.listen(process.env.PORT || 4000, () => {
  console.log("STARTED SERVER ON PORT", process.env.PORT || 4000);
});
