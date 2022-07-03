const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema(
  {
    name: {type: String, required: true},
    instrument: {type: String, required: true}
  }
);

module.exports = mongoose.model('Artist', ArtistSchema);