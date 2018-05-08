const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cdSchema = new Schema({
  albumId : Schema.Types.ObjectId,
  inventory: Number,
  price  : Number,
  cost: Number,
  unitsSold: { type: Number, default: 0 }
});

const CD = mongoose.model('CD', cdSchema);

module.exports = CD;