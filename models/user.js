const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name : {firstName: String, lastName: String},
  password: String,
  email  : {type: String, unique: true} ,
  shippingAddress: {address1: String, address2: String, city: String, state: String, zipcode: String},
  orders: [],
  wishList: [],
  shoppingCart: [],
  role: {
    type: String,
    enum : ['CUSTOMER', 'ADMIN'],
    default : 'CUSTOMER'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;