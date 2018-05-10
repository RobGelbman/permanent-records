const express     = require('express');
const authRoutes  = express.Router();
const passport    = require("passport");
const User        = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

/* GET signup page */
authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

/* POST signup page */
authRoutes.post("/signup", (req, res, next) => {  
  const username = req.body.email;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Enter email and password" });
    return;
  }
  
  User.findOne({ email: username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      password: hashPass,
      email: username
    });
    
    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});

/* GET login page */
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

/* POST login page */
authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

/* GET profile page */
// authRoutes.get("/profile/", (req, res, next) => {
//   res.render("auth/profile");
// });

/* GET logout page */
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;