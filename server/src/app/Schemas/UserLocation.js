const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const UserLocationSchema = new mongoose.Schema({
  name: String,
  user_id: Number,
  user_health: Number,
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
});

module.exports = mongoose.model('UserLocation', UserLocationSchema);
