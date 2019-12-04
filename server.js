var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");
var inquirer = require("inquirer");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Set our port to 8080
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "game_site_db"
});

var gamesArray = [];

app.get("/", function(req, res) {
  //connection.end();
  res.sendFile(path.join(__dirname, "index.html"));
  

connection.connect(function(err){
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  fill();
});

function fill() {
  connection.query("SELECT * FROM games ORDER BY rel DESC;", function(err, result) {
    if (err) throw err;
    
    console.log(result);
 
    var i;
   

    for (i = 0; i < result.length; i++) { 
  gamesArray.push(result[i]);
}

console.log(gamesArray);

app.get("/api/tables", function(req, res) {
  return res.json(gamesArray);
});



  });
}

// connection.end();





});

app.get("/:game", function(req, res) {
  var chosen = req.params.game;
  res.sendFile(path.join(__dirname, chosen + ".html"));
  });

//oh my gosh it works!
//ahem, this nifty little bit works in conjunction with the dynamically generated href 
//attributes in the cards, to direct the readers to the review page of a certain game


//cheerio stuff 
// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");




request("http://localhost:3000/Crysis2", function(error, response, html) {

 
  var $ = cheerio.load(html);

  var results = [];


  //DON'T NEED 'EACH'
  $(".verdict").each(function(i, element) {

   
    var paragraphText = $(element).text();

    
    results.push({
      paragraphText: paragraphText
    });
  });


  console.log(results[0]);
});
