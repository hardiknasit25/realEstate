const mongoose = require("mongoose");

const residency = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  imageUrls: {
    type: Array,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  parkings: {
    type: Number,
    required: true
  },
  furnished: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  userRef: {
    type: String,
    require: true
  }
}, { timestamps: true })

const residencyModel = mongoose.model("Residency", residency);
module.exports = residencyModel;