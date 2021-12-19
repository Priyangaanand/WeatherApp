const express = require("express");
const https = require("https");
const app = express();
app.use(express.urlencoded({extended:true}));

app.get("/",function(req,res)

{
    res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res)
{
    var Cityname =req.body.CName;
    // console.log(Cityname);
    const query = Cityname;
    const apiKey ="7d1f6dc6f0c4aa9b71fa89a8947eaefe";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+apiKey;
    https.get(url,function(response)
    {
       response.on("data",function(data)
      {
       const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
          const weatherDescription =weatherData.weather[0].description;
          const icon =weatherData.weather[0].icon;
          res.write(`<h1>The temperature in ${query}, ${temp} degree Celcius </h1>`);
          res.write(`<h1>The Weather description is ${weatherDescription} </h1>`);
          res.write(`<img src= http://openweathermap.org/img/wn/${icon}@2x.png>`);
      });
    //   app.post("/sucess",function(req,res)
    //   {
    //       res.redirect("/");
    //   });

    });
});





app.listen( process.env.PORT|| 3000,function()
{
    console.log("Server started");
});
