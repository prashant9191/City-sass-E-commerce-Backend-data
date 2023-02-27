const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const men_jacketsSchema = new Schema({
  img: [String],
  title: String,
  price: [String],
  offer: String,
  rating: Number,
  userreviews: Number,
  color: [{
    c: String,
    imgs: [String]
  }],
  size: [String],
  details: [String],
  listpoints: [String],
  fabric: [String],
  reviews: [{
    username: String,
    review: String
  }]
},{
    versionKey:false
});

const men_jacketsModel = mongoose.model('MenJcaket', men_jacketsSchema);

const men_shooseSchema = new Schema({
  img: [String],
  title: String,
  price: [String],
  offer: String,
  rating: Number,
  userreviews: Number,
  color: [{
    c: String,
    imgs: [String]
  }],
  size: [String],
  details: [String],
  listpoints: [String],
  fabric: [String],
  reviews: [{
    username: String,
    review: String
  }]
},{
    versionKey:false
});

const men_ShooseModel = mongoose.model('MenShoose', men_shooseSchema);
const womenTshirtSchema = new Schema({
  img: [String],
  title: String,
  price: [String],
  offer: String,
  rating: Number,
  userreviews: Number,
  color: [{
    c: String,
    imgs: [String]
  }],
  size: [String],
  details: [String],
  listpoints: [String],
  fabric: [String],
  reviews: [{
    username: String,
    review: String
  }]
},{
    versionKey:false
});

const womenTshirtModel = mongoose.model('womenTshirt', womenTshirtSchema);
const kidsSchema = new Schema({
  img: [String],
  title: String,
  price: [String],
  offer: String,
  rating: Number,
  userreviews: Number,
  color: [{
    c: String,
    imgs: [String]
  }],
  size: [String],
  details: [String],
  listpoints: [String],
  fabric: [String],
  reviews: [{
    username: String,
    review: String
  }]
},{
    versionKey:false
});

const kidsJacketsModel = mongoose.model('kidsJacket', kidsSchema);

const cartSchema = new Schema({
  img: [String],
  title: String,
  price: [String],
  offer: String,
  owner:String,
  quantity: Number,
  rating: Number,
  userreviews: Number,
  color: [{
    c: String,
    imgs: [String]
  }],
  size:String,
  details: [String],
  listpoints: [String],
  fabric: [String],
  reviews: [{
    username: String,
    review: String
  }]
},{
    versionKey:false
});

const cartModel = mongoose.model('Cart_data', cartSchema);

module.exports = {men_jacketsModel,men_ShooseModel,womenTshirtModel,kidsJacketsModel,cartModel};
