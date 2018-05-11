const express = require('express');
const router  = express.Router();
const Album         = require("../models/album");

/* GET home page */
router.get('/', (req, res, next) => {
  
  
  Album.find({})
    .then(albums => {
      console.log(req.session)
      if(req.user != null){
        if(req.user.role === "ADMIN"){
          console.log(req.user.role)
          // var loggedIn ={};
          var loggedIn = {isAdmin: true};
          
          loggedIn.email = req.user.email;
        }else{
          var loggedIn ={};
        }
      }
      if (req.user != null){
      loggedIn.email= req.user.email
      }
      res.render('index', {albums: albums, loggedIn});
    })
    .catch(error => {
      console.log(error)
    })
});

router.get('/details/:_id', (req, res, next) => {
  Album.findById(req.params._id)
  .then(album => {
    if(req.user != null){
      if(req.user.role === "ADMIN"){
        console.log(req.user.role)
        // var loggedIn ={};
        var loggedIn = {isAdmin: true};
        
        loggedIn.email = req.user.email;
      }else{
        var loggedIn ={};
      }
    }
    if (req.user != null){
    loggedIn.email= req.user.email
    }
    res.render('details', {album, loggedIn})
  })
  .catch(error => {
    console.log(error)
  })
})


router.get('/noAccess', (req, res, next) => {
  res.render('no-access');
});
module.exports = router;
