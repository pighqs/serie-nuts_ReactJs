var express   = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var fileUpload = require("express-fileupload");

var Trello = require("trello");
var trello = new Trello("9603bc7c9a3c59641cbd504787ab613e", "7df626b71b4cb849b6d1f70ef7dc890d72d1c84eb054cd4c6fb509fdc5981515");

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(fileUpload());

var nuts = [];

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/addfav', function(req, res) {
  var newNut = req.body;
  console.log(newNut)
  nuts.push(newNut);
  console.log(nuts);
  res.json(nuts);;
});



app.post("/contact", function(req, res) {
     trello.addCard(req.body.email +" "+ req.body.fullname, req.body.message +" "+ req.body.email, "5a09a44b26ae08022ce6f477",
        function (error, trelloCard) {
        }); 
  res.json("ok");
});

var port = process.env["PORT"] || 8080;

app.listen(port, function() {
  console.log("Server listening on port 8080");
});
