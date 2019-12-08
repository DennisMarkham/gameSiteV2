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
    

 
    var i;
   

    for (i = 0; i < result.length; i++) { 
  gamesArray.push(result[i]);
}

console.log(gamesArray);



app.get("/api/tables", function(req, res) {
  return res.json(gamesArray);
});

//formats the game title for the request


//quotes stuff BEGINS
//**************

//declare array to fill with quotes
var quotes = [];

function cardQuotes(cardTitle){
  var cardText = "";  
// var cardTextArray = [];
request("http://localhost:3000/" + cardTitle.replace(/\s/g, ''), function(error, response, html) {


console.log("Does request fire?"); 
  var $ = cheerio.load(html);

  



  //DON'T NEED 'EACH'?
  $(".verdict").each(function(i, element) {

   
    cardText = $(element).text();

// cardTextArray.push({cardText: cardText});
  });



});

//Dammit I've tried so many things.  Turning it into an array, turning it into an array of objects.  
//Ugh.
//I can't seem to get the results of the scraping into a variable to be returned, that's the
//problem.
// return cardTextArray[0].cardText
return cardText;
}
//function ends here

//this shows up already but for some reason the function never returns anything
console.log("Games array zero title:" + gamesArray[0].title)
//uses cardQuotes function established above to fill quotes array
quotes.push(cardQuotes(gamesArray[0].title));
quotes.push(cardQuotes(gamesArray[1].title));
quotes.push(cardQuotes(gamesArray[2].title));

console.log("Here's the quotes array: " + quotes);
//just shows up black, hmmm


  app.get("/api/quotes", function(req, res) {
  return res.json(quotes);
});
//quotes stuff (request stuff) ENDS
//****************

  //database connection thing ends here
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