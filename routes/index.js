const express = require('express');
const router  = express.Router();
const Album         = require("../models/album");

/* GET home page */
router.get('/', (req, res, next) => {
  Album.find({})
    .then(albums => {
      console.log(albums)
      res.render('index', {albums});
    })
    .catch(error => {
      console.log(error)
    })
});

router.get('/details/:_id', (req, res, next) => {
  Album.findById(req.params._id)
  .then(album => {
    res.render('details', album)
  })
  .catch(error => {
    console.log(error)
  })
})


router.get('/noAccess', (req, res, next) => {
  res.render('no-access');
});
module.exports = router;
