const express       = require("express");
const siteRoutes    = express.Router();
const passport      = require("passport");
const mongoose      = require('mongoose');
var ObjectId        = require('mongoose').Types.ObjectId;
const User          = require("../models/user");
const Album         = require("../models/album");
const CD            = require("../models/cd");
const Vinyl         = require("../models/vinyl");
const multer        = require("multer");
const path          = require('path');
const upload        = multer({dest:path.join( __dirname, '../public/albumArtwork')});
const CdInfo = {};
const VinylInfo ={};

siteRoutes.get("/profile", ensureAuthenticated, (req, res, next) => {

  User.findById(req.user._id, (err, user) => {
    if (err) { return next(err); }
    const profileData = {email: user.email};
    profileData.name = {firstName:user.name.firstName, lastName: user.name.lastName};
    profileData.shippingAddress = {address1: user.shippingAddress.address1, address2: user.shippingAddress.address2, city: user.shippingAddress.city, state: user.shippingAddress.state, zipcode: user.shippingAddress.zipcode};
    res.render('auth/profile', profileData);
  });

});

/* POST updateProfile page */
siteRoutes.post("/profile", ensureAuthenticated, (req, res, next) => {
  const updateData = {};
  updateData.name = {firstName:req.body.firstName, lastName: req.body.lastName};
  updateData.shippingAddress = {address1: req.body.addressLine1, address2: req.body.addressLine2, city: req.body.city, state: req.body.state, zipcode: req.body.zipCode};
  User.findByIdAndUpdate(req.user._id, updateData)
    .then((user) => { 
      updateData.email = user.email;
      res.render("auth/profile", updateData) 
    })
  .catch((err) => { console.log('An error happened:', err) })

});

siteRoutes.get('/admin', ensureAuthenticated, checkRoles("ADMIN"), (req, res) => {
  res.render('admin/index', {user: req.user});
});

siteRoutes.get('/admin/album-entry', checkRoles("ADMIN"), (req, res) => {
  res.render('admin/album-entry', {user: req.user});
});

siteRoutes.post('/album-entry', upload.single('photo'), checkRoles("ADMIN"), (req, res) => {
  var albumID;
  newAlbum = new Album;
  newAlbum.artist = req.body.artist;
  newAlbum.title = req.body.albumTitle;
  newAlbum.label = req.body.label;
  newAlbum.catalogNo = req.body.catalogNumber;
  newAlbum.releaseDate = req.body.date;
  newAlbum.genre = req.body.genre;
  newAlbum.trackListing = req.body.tracklist;
  if (req.file != null){
    newAlbum.albumCover= `/albumArtwork/${req.file.filename}`
  }

  newAlbum.save((err, album) => {
    if (err) {
      res.render("admin/album-entry", { message: "Something went wrong" });
    } else {
      newCD = new CD;
      newCD.albumId = album._id;
      newCD.price = req.body.cdPrice;
      newCD.inventory = req.body.cdQuantity;

      newCD.save((err) => {
        if (err) {
          res.render("admin/album-entry", { message: "Something went wrong" });
        } 
      });

      newVinyl = new Vinyl;
      newVinyl.albumId = album._id;
      newVinyl.price = req.body.vinylPrice;
      newVinyl.inventory = req.body.vinylQuantity;
      newVinyl.format = req.body.vinylFormat;

      newVinyl.save((err) => {
        if (err) {
          res.render("admin/album-entry", { message: "Something went wrong" });
        } 
      });
    }
  });

  res.render('admin/index', {user: req.user});
  
});

siteRoutes.get('/admin/album-edit', checkRoles("ADMIN"), (req, res) => {
  Album.find({}).sort({artist: 1, title:1})
    .then(albums => {
      res.render('admin/album-edit', {user: req.user, select: true, albums});
    })
    .catch(error => {
      console.log(error)
    })
});

siteRoutes.get('/admin/album-edit/:_id', checkRoles("ADMIN"), (req, res) => {
  Album.findById(req.params._id)
    .then(album => {
      CD.findOne({albumId: ObjectId(album._id)})
      .then(cd => {
        if (cd != null){
          CdInfo.price = cd.price;
          CdInfo.quantity = cd.inventory;
        } else {
          CdInfo.price = 0;
          CdInfo.quantity = 0;
        }

      })
      .catch(error => {
        console.log(error)
      })

      Vinyl.findOne({albumId: ObjectId(album._id)})
      .then(vinyl => {
        if (vinyl != null){
          VinylInfo.price = vinyl.price;
          VinylInfo.quantity = vinyl.inventory;
        } else {
          VinylInfo.price = 0;
          VinylInfo.quantity = 0;
        }
      })
      .catch(error => {
        console.log(error)
      })
      res.render('admin/album-edit', {user: req.user, edit: true, album, VinylInfo, CdInfo, trackList: album.trackListing});
    })
    .catch(error => {
      console.log(error)
    })  
});

siteRoutes.post('/album-update', upload.single('photo'), checkRoles("ADMIN"), (req, res) => {
  const updateAlbum = {
    artist : req.body.artist,
    title: req.body.albumTitle,
    label  : req.body.label,
    catalogNo: req.body.catalogNumber,
    releaseDate: req.body.date,
    albumCover: String,
    trackListing: req.body.tracklist,
    genre: req.body.genre
  }

  if (req.file != null){
    updateAlbum.albumCover= `/albumArtwork/${req.file.filename}`
  }

  Album.findByIdAndUpdate(req.body.album_id, { $set: updateAlbum })
  .then(album => {
    const updateCD = {
      price : req.body.cdPrice,
      quantity: req.body.cdQuantity,
    }

    CD.updateOne({albumId: ObjectId(req.body.album_id)}, { $set:{inventory: req.body.cdQuantity, price: req.body.cdPrice }})
    .then(cd => {
      
    })
    .catch(error => {
        console.log(error)
      })

    Vinyl.updateOne({albumId: ObjectId(req.body.album_id)}, { $set:{inventory: req.body.vinylQuantity, price: req.body.vinylPrice }})
    .then(cd => {})
    .catch(error => {
        console.log(error)
      })

      res.render('admin/index', {user: req.user});
  })
  .catch(error => {
    console.log(error)
  })
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/noAccess')
    }
  }
}

module.exports = siteRoutes;