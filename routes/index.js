const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get('/noAccess', (req, res, next) => {
  res.render('no-access');
});
module.exports = router;
