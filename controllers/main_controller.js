module.exports.home = function (req, res) {
  return res.render("home");
};

const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("profile");
  });
};
// get the sign up data
module.exports.create = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return res.redirect("back");
        }
        return res.redirect("/");
      });
    } else {
      return res.redirect("/profile");
    }
  });
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  console.log("success", "Logged in Successfully!");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  console.log("success", "Logged out Successfully!");
  return res.redirect("/");
};
