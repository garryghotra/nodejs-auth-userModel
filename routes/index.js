const express = require("express");
const router = express.Router();
const passport = require("passport");

const mainController = require("../controllers/main_controller");

router.get("/", mainController.home);
router.get("/profile", passport.checkAuthentication, mainController.profile);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  mainController.createSession
);

router.post("/create", mainController.create);
router.get("/logout", mainController.destroySession);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/" }),
  mainController.createSession
);

module.exports = router;
