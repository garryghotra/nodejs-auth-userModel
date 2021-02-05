const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
// used for session cookie
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
const passportLocal = require("./config/passport-local-strategy");

const passportGoogle = require("./config/passport-google-oauth2-strategy");

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "demoProject",
    secret: "something",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 500,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use("/", require("./routes"));

//for handling the routes which are not defined and this is supposed to be at last
app.get("*", function (req, res) {
  res.redirect("/");
});

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
