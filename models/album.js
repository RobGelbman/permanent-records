const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const albumSchema = new Schema({
  artist : String,
  title: String,
  label  : String,
  catalogNo: String,
  releaseDate: String,
  albumCover: String,
  trackListing: [],
  genre: String
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;