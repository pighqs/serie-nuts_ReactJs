var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var fileUpload = require("express-fileupload");

var Trello = require("trello");
var trello = new Trello(
  "9603bc7c9a3c59641cbd504787ab613e",
  "7df626b71b4cb849b6d1f70ef7dc890d72d1c84eb054cd4c6fb509fdc5981515"
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(fileUpload());

//// CONNECTION DB MLAB
var mongoose = require("mongoose");
var options = { server: { socketOptions: { connectTimeoutMS: 30000 } } };

mongoose.connect(
  "mongodb://cowboys:serienuts@ds121534.mlab.com:21534/serienuts",
  { useMongoClient: true },
  function(err) {
    if (err) {
      console.log("erreur : " + err);
    } else {
      console.log("bien connecté à DB Mlab serie_nuts");
    }
  }
);

// schemas
var nutSchema = mongoose.Schema({
  nutFromDB_id: Number,
  likeByUser: String
});
var userSchema = mongoose.Schema({
  usermail: String,
  userpassword: String
});

// models
var NutModel = mongoose.model("nuts", nutSchema);
var UserModel = mongoose.model("users", userSchema);
var users = [];


app.get("/", function(req, res) {
  res.render("index");
});

app.post("/findnuts", function(req, res) {

  var nutIDsFromDB = [];

  NutModel.find({ likeByUser: req.body.user_id } ,function(err, nuts) {
    for (var i = 0; i < nuts.length; i++) {
      nutIDsFromDB.push(nuts[i].nutFromDB_id);
    }
    res.json(nutIDsFromDB);
  });
});

app.post("/addfav", function(req, res) {

  var newNut = new NutModel({
    nutFromDB_id: req.body.nut_id,
    likeByUser: req.body.user_id
  });

  newNut.save(function(error, nut) {
    if (error) {
      console.log(error);
    } else {
      res.json(nut);
    }
  });
});

app.post("/delfav", function(req, res) {

  NutModel.remove({ nutFromDB_id: req.body.nut_id, likeByUser: req.body.user_id }, function(error, nut) {
    if (error) {
      console.log(error);
    } else {
    res.json(nut);
    }
  });
});

app.post("/login", function(req, res) {
  console.log(req.body.email);
  console.log(req.body.password);
  // attention la req retournée est une string, il faut tester "undefined"
  
  var test = "ko";
  if (
    req.body.email != undefined &&
    req.body.email != "undefined" &&
    req.body.email != "" &&
    req.body.password != undefined &&
    req.body.password != "" &&
    req.body.password != "undefined"
  ) {
    UserModel.find(function(err, userlist) {
      for (var i = 0; i < userlist.length; i++) {
        if (
          req.body.email == userlist[i].usermail &&
          req.body.password == userlist[i].userpassword
        ) {
          test = userlist[i]._id;
        } 
      }
      res.json(test);
    });
  } else {
    res.json(test);
  }
});

app.post("/signup", function(req, res) {
  var query = UserModel.findOne({ usermail: req.body.email });
  query.exec(function(error, checkexist) {
    if (checkexist == undefined) {
      var newUser = new UserModel({
        usermail: req.body.email,
        userpassword: req.body.password
      });
      newUser.save(function(error, savedUser) {
        if (error) {
          console.log(error);
        } else {
          res.json(savedUser);
        }
      });
    } else {
      res.json(error);
    }
  });
});

app.post("/contact", function(req, res) {
  trello.addCard(
    req.body.email + " " + req.body.fullname,
    req.body.message + " " + req.body.email,
    "5a09a44b26ae08022ce6f477",
    function(error, trelloCard) {}
  );
  res.json("ok");
});


app.get("/home", function(req, res) {
  res.render("index");
});

app.get("/my%20nuts", function(req, res) {
  res.render("index");
});

app.get("/about", function(req, res) {
  res.render("index");
});

app.get("/affichageseriesingle", function(req, res) {
  res.render("index");
});

app.get("/searchresults", function(req, res) {
  res.render("index");
});

app.get("/contact", function(req, res) {
  res.render("index");
});

app.get("/signuplogin", function(req, res) {
  res.render("index");
});

app.get("/logout", function(req, res) {
  res.render("index");
});

var port = process.env["PORT"] || 8080;

app.listen(port, function() {
  console.log("Server listening on port 8080");
});
