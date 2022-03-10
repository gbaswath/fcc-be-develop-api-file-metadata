//Import Dependencies
var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

//Initialize Project
var app = express();
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

//File Analyser Post Call
app.post("/api/fileanalyse", upload.single('upfile'), function (req, res) {
  console.log("Got Request File" + JSON.stringify(req.file));
  console.log("Got Request Body " + JSON.stringify(req.body));
  const fileName = req.file.originalname;
  console.log("Got File Name " + fileName);
  const fileType = req.file.mimetype;
  console.log("Got File Type " + fileType);
  const fileSize = req.file.size;
  console.log("Got File Size " + fileSize);
  const result = {"name" : fileName, "type": fileType, "size": fileSize};
  console.log("Prepared Result " + JSON.stringify(result));
  res.json(result);
});