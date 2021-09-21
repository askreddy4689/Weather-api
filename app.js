//jshint esversion:6
const express=require("express");
const https =require("https");
const bodyparser=require("body-parser");
const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
 res.sendFile(__dirname+"/index.html");
});
app.post("/", function(req,res){
const city= req.body.cityname;
//console.log(city);
https.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=03c28434b0c9b9a200d45bd7770e4821&units=metric",function(response){
   response.on("data",function(data){
     const wdata=JSON.parse(data);
      const temp=wdata.main.temp;
      const icon=wdata.weather[0].icon;
      const url="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The temperature in "+city +" is "+temp+"degree celcius.</h1>");
     res.write("<img src="+url+">");
     res.send();
    });
});
});
app.listen(3000,function(){
 console.log("server is running on port 3000.");
});
