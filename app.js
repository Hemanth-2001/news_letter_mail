const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");
const { text } = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    var fullname = req.body.full_name;
    var email = req.body.email;
    var password = req.body.password;
    console.log(fullname + "," + email + ","+password);

    var data = {
        members:[
        {
          email_address: email,
          email_type: "text",
          status: "subscribed",
          merge_fields:{
              FNAME: fullname,
              LNAME: password
          }
          }
        ]
    };

    const jsondata = JSON.stringify(data);
    
    const url = "https://us2.api.mailchimp.com/3.0/lists/f3e717938e";
    const options = {
        method: "POST",
        auth: "f3e717938e:00e80a8926ca66ef75800171eb179db6-us2"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "failure.html" );
        }

        response.on("data", function(data){

        });
    });
    request.write(jsondata);
    request.end();
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Listening on port 3000");
})


//00e80a8926ca66ef75800171eb179db6-us2

//f3e717938e