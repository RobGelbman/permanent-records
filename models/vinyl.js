const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const vinylSchema = new Schema({
  albumId : Schema.Types.ObjectId,
  format: {type: Number, enum: [7, 10, 12], default: 12},
  inventory: Number,
  price  : Number,
  cost: Number,
  unitsSold: { type: Number, default: 0 }
});

const Vinyl = mongoose.model('Vinyl', vinylSchema);

module.exports = Vinyl