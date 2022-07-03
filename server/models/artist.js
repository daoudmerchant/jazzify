const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema(
  {
    name: {type: String, required: true},
    instrument: {type: String, required: true},
  }
);

// Virtual for book's URL
ArtistSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

//Export model
module.exports = mongoose.model('Artist', ArtistSchema);