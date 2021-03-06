// Express
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// BodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session
const session = require("express-session");
app.use(
  session({
    secret: "a4f8071f-c873-4447-8ee2",
    resave: false,
    saveUninitialized: false
  })
);

// Bcrypt
const bcrypt = require("bcrypt");

// Trello
const fileUpload = require("express-fileupload");
app.use(fileUpload());

const Trello = require("trello");
const trello = new Trello(
  "9603bc7c9a3c59641cbd504787ab613e",
  "7df626b71b4cb849b6d1f70ef7dc890d72d1c84eb054cd4c6fb509fdc5981515"
);

////////////// CONNECTION DB MLAB /////////////////////
const mongoose = require("mongoose");
const options = { server: { socketOptions: { connectTimeoutMS: 30000 } } };

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
const nutSchema = mongoose.Schema({
  nutFromDB_id: Number,
  likeByUser: String
});
const userSchema = mongoose.Schema({
  usermail: String,
  userpassword: String
});

// models
const NutModel = mongoose.model("nuts", nutSchema);
const UserModel = mongoose.model("users", userSchema);
let users = [];

//////////////////////////////////////////////////////

app.get("/", function(req, res) {
  res.render("index");
});


app.post("/findnuts", function(req, res) {
  let nutIDsFromDB = [];

  NutModel.find({ likeByUser: req.body.user_id }, function(err, nuts) {
    for (let i = 0; i < nuts.length; i++) {
      nutIDsFromDB.push(nuts[i].nutFromDB_id);
    }
    res.json(nutIDsFromDB);
  });
});

app.post("/addfav", function(req, res) {
  let newNut = new NutModel({
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
  NutModel.remove(
    { nutFromDB_id: req.body.nut_id, likeByUser: req.body.user_id },
    function(error, nut) {
      if (error) {
        console.log(error);
      } else {
        res.json(nut);
      }
    }
  );
});

app.post("/login", function(req, res) {
  // attention la req retournée est une string, il faut tester "undefined"
  let testLogin = "ko";

  UserModel.findOne({ usermail: req.body.email }, function(err, user) {
    req.session.user = user;
    if (user) {
      bcrypt
        .compare(req.body.password, user.userpassword)
        .then(function(passwordsMatch) {
          if (passwordsMatch) {
            req.session.user = user;
            req.session.userID = user._id;
            res.json(req.session.userID);
          } else {
            res.json(testLogin);
          }
        })
        .catch(function(error) {
          console.log("error", error);
          res.json(testLogin);
        });
    } else {
      res.json(testLogin);
    }
  });
});

app.post("/signup", function(req, res) {
  const query = UserModel.findOne({ usermail: req.body.email });
  query.exec(function(error, mailAlreadyExistsInDB) {
    if (!mailAlreadyExistsInDB) {
      // hashage mdp
      bcrypt.hash(req.body.password, 10).then(function(hashedPassword) {
        // Store hash in your password DB.
        let newUser = new UserModel({
          usermail: req.body.email,
          userpassword: hashedPassword
        });
        newUser.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          } else {
            req.session.user = savedUser;
            res.json(req.session.user);
          }
        });
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
  
});

let port = process.env["PORT"] || 8080;

app.listen(port, function() {
  console.log("Server listening on port 8080");
});
