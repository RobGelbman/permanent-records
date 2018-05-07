const express    = require("express");
const siteRoutes = express.Router();
const passport      = require("passport");
const User        = require("../models/user");

siteRoutes.get("/profile", ensureAuthenticated, (req, res, next) => {

  User.findById(req.user._id, (err, user) => {
    if (err) { return next(err); }
    const profileData = {email: user.email}
    console.log(user.email)
    res.render('auth/profile', profileData);
  });

});

/* POST updateProfile page */
siteRoutes.post("/profile", ensureAuthenticated, (req, res, next) => {
  const updateData = {};
  updateData.name = {firstName:req.body.firstName, lastName: req.body.lastName};
  updateData.shippingAddress = {address1: req.body.addressLine1, address2: req.body.addressLine2, city: req.body.city, state: req.body.state, zipcode: req.body.zipCode};
  console.log(req.user._id);
  User.findByIdAndUpdate(req.user._id, updateData)
    .then((user) => { 
      updateData.email = user.email;
      console.log(updateData)
      res.render("auth/profile", updateData) 
    })
  .catch((err) => { console.log('An error happened:', err) })

});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}


module.exports = siteRoutes;