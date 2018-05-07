const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const vinylSchema = new Schema({
  albumId : Schema.Types.ObjectId,
  inventory: Number,
  price  : Number,
  cost: Number,
  unitsSold: Number
});

const vinyl = mongoose.model('Vinyl', vinylSchema);