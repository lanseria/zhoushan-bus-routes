const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const allLineSchema = Schema({
  content: String,
  createdTime: {
    type: Date,
    default: Date.now
  },
  updatedTime: {
    type: Date,
    default: Date.now
  },
  areaId: Number
})

const AllLine = mongoose.model('AllLine', allLineSchema);

exports.AllLine = AllLine;