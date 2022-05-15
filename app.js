const https = require("https");
const bodyParser = require("body-parser");
const express = require("express");
const port = 3000;
var app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function (req,res) {
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  console.log(firstName, lastName, email);
});
app.listen(port,function () {
  console.log("server open on port 3000");

});
