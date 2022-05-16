const https = require("https");
const bodyParser = require("body-parser");
const express = require("express");
const port = process.env.PORT;
var app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function (req,res) {
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const url = "https://us9.api.mailchimp.com/3.0/lists/AUDIENCE_ID";
  const dataJSON = JSON.stringify({
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }]
  });
  const options = {method:"POST",auth:"derejeT:MAILCHIMP_API_KEY"};
  var request = https.request(url,options,function (response) {
    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html")
    }
    response.on('data',function (data) {
      var dataParse=JSON.parse(data);

    });

  });
  request.write(dataJSON);
  request.end();

});
app.post("/failure",function (req,res) {
  res.redirect("/");
});
app.listen(port || 3000,function () {
  console.log("server open on port 3000");

});
