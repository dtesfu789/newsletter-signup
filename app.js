const https = require("https");
const bodyParser = require("body-parser");
const express = require("express");
const port = 3000;
var app= express();

app.get("/",function (req,res) {
  res.send("<h1>test</h1>");
});
app.listen(port,function () {
  console.log("server open on port 3000");
});
