const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cdSchema = new Schema({
  albumId : Schema.Types.ObjectId,
  inventory: Number,
  price  : Number,
  cost: Number,
  unitsSold: Number
});

const cd = mongoose.model('Cd', cdSchema);