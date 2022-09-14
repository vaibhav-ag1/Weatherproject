const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
//getting data
app.get("/",function(req,res){


    res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
    
const query=req.body.cityName;
const id="ba575fd23e657b7236f31c0309bc2d25";


url="https://api.openweathermap.org/data/2.5/weather?q="+query+",in&appid="+id+"&units=metric";
https.get(url,function(response){
    console.log(response.statusCode);
    
    response.on("data",function(data){
        const weatherData=JSON.parse(data)
        const temp=weatherData.main.temp
        const weatherDescription=weatherData.weather[0].description
        const icon=weatherData.weather[0].icon
        const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<p>The weather is "+weatherDescription+"</p>");
        res.write("<h1>The temp in kashipur is "+temp+ "C  </h1>");
        res.write("<img src="+imageURL+">");
        res.send();
    })
});

});


app.listen(3000,function(){
    console.log("server has started");
});