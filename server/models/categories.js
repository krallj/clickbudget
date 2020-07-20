const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: String,
  sites: { type: Array, default: [] },
  maxClicks: { type: Number, default: null }
})

module.exports = mongoose.model('Category', CategorySchema) 