const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const albumSchema = new Schema({
  artist : String,
  title: String,
  label  : String,
  releaseDate: String,
  cover: String,
  trackListing: [],
  genre: String
});

const album = mongoose.model('Album', albumSchema);