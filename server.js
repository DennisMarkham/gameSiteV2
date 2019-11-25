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