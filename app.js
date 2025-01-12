// const express = require("express");
// const https = require("https");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));

// // get request sends html form to user
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

// app.post("/", function (req, res) {
//   const apiKey = "70596b413bb1e3c970f0b88d496e8dbd#";
//   const query = req.body.cityName;

//   const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=metric&appid=" +apiKey;

//   // http get requests to external servers via api
//   https.get(url, function (response) {
//     // console.log(response.statusCode);

//     // data parsing and showcasing
//     response.on("data", function (data) {
//       const weatherData = JSON.parse(data);
//     //   console.log("Description: " + weatherData.weather[0].description);
//       const temp = weatherData.main.temp;
//       const des = weatherData.weather[0].description;
//     //   const city = weatherData.name;
//       const feel = weatherData.main.feels_like;
//       const icon = weatherData.weather[0].icon;
//       const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
//       // we can only use 1 res.send to send data on browser
//       res.write("<h1>The weather in " +query +" is currently " +des +" with temperature " +temp +" degree celcius</h1>");
//       res.write("<p> but the temperature feels like is " + feel + "</p>");
//       res.write("<img src=" + imgUrl + ">");

//       res.send();
//     });
//   });
//   // dont use res.send twice it ll give error
//   // res.send("What a lovely weather today");
// });

// app.listen(3000, function () {
//   console.log("Server is listening on 3000");
// });

// const express = require("express");
// const https = require("https");
// const bodyParser = require("body-parser");
// const path = require("path");

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// //app.use(express.static(path.join(__dirname, "public"))); // Serve static files like CSS

// // telling express to serve PUBLIC folder for static resources
// app.use(express.static("public"));

// // Get request sends the HTML form to the user
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

// app.post("/", function (req, res) {
//   const apiKey = "70596b413bb1e3c970f0b88d496e8dbd#";
//   const query = req.body.cityName;

//   const url =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     query +
//     "&units=metric&appid=" +
//     apiKey;

//   // HTTP GET request to external servers via API
//   https.get(url, function (response) {
//     response.on("data", function (data) {
//       const weatherData = JSON.parse(data);
//       const temp = weatherData.main.temp;
//       const des = weatherData.weather[0].description;
//       const feel = weatherData.main.feels_like;
//       const icon = weatherData.weather[0].icon;
//       const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

//       // Serve a styled response using HTML and Bootstrap
//       res.write(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Weather Result</title>
//           <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
//         </head>
//         <body class="d-flex align-items-center justify-content-center" style="background: linear-gradient(135deg, #74ebd5, #9face6); min-height: 100vh;">
//           <div class="text-center p-5 bg-white rounded shadow" style="max-width: 400px;">
//             <h1 class="mb-4">Weather in ${query}</h1>
//             <h2>${des}</h2>
//             <h3>${temp}°C (Feels like ${feel}°C)</h3>
//             <img src="${imgUrl}" alt="Weather Icon" class="img-fluid my-3">
//             <a href="/" class="btn btn-primary mt-3">Search Again</a>
//           </div>
//         </body>
//         </html>
//       `);
//       res.send();
//     });
    
//   });
// });



// // Start the server
// app.listen(3000, function () {
//   console.log("Server is running on port 3000.");
// });




const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// telling express to serve PUBLIC folder for static resources
app.use(express.static("public"));

// Get request sends the HTML form to the user
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const apiKey = "70596b413bb1e3c970f0b88d496e8dbd"; // Replace with your valid API key
  const query = req.body.cityName;

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=metric&appid=" +
    apiKey;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const des = weatherData.weather[0].description.toLowerCase();
      const feel = weatherData.main.feels_like;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      // Determine background gradient
      let background = "#74ebd5"; // Default
      if (des.includes("rain")) background = "#a4c0f4";
      else if (des.includes("clear")) background = "#f9d423";
      else if (des.includes("cloud")) background = "#d3d3d3";
      else if (des.includes("snow")) background = "#ffffff";

      // Serve a styled response using HTML and Bootstrap
      res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Weather Result</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body style="background: ${background}; background: linear-gradient(135deg, ${background}, #ffffff); min-height: 100vh;" class="d-flex align-items-center justify-content-center">
          <div class="text-center p-5 bg-white rounded shadow" style="max-width: 400px;">
            <h1 class="mb-4">Weather in ${query}</h1>
            <h2>${des.charAt(0).toUpperCase() + des.slice(1)}</h2>
            <h3>${temp}°C (Feels like ${feel}°C)</h3>
            <img src="${imgUrl}" alt="Weather Icon" class="img-fluid my-3">
            <a href="/" class="btn btn-primary mt-3">Search Again</a>
          </div>
        </body>
        </html>
      `);
      res.send();
    });
  });
});

// Start the server
app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
