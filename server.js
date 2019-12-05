var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");
var inquirer = require("inquirer");

//cheerio stuff 
// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

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


//quotes stuff BEGINS
//**************

request("http://localhost:3000/Crysis2", function(error, response, html) {

console.log("Does request fire?"); 
  var $ = cheerio.load(html);

  var quotes = [];


  //DON'T NEED 'EACH'
  $(".verdict").each(function(i, element) {

   
    var paragraphText = $(element).text();

    
    quotes.push(paragraphText);

  //this fires but returns object object
  console.log("This is one where the game is variable:" + quotes[0]);

  app.get("/api/quotes", function(req, res) {
  return res.json(quotes);
});

//"verdict" scraping ends here
  });


});
//quotes stuff (request stuff) ENDS
//****************

  });

//fill ends here
}







});

app.get("/:game", function(req, res) {
  var chosen = req.params.game;
  res.sendFile(path.join(__dirname, chosen + ".html"));
  });

//oh my gosh it works!
//ahem, this nifty little bit works in conjunction with the dynamically generated href 
//attributes in the cards, to direct the readers to the review page of a certain game






//so what I'm thinking...this has to be placed where the games array has been declared
//(scope and all that).  Three of these will be placed, the variable being item 0, 1, and 2
//in the games array.  In fact, let's keep this, as a model, and try to do some of that.
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


  console.log("This is the model: " + results[0].paragraphText);
});
