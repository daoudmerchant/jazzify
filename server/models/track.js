const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackSchema = new Schema(
  {
    uri: {type: String, required: true},
    artists: [{type: Schema.Types.ObjectId, ref: 'Artist', required: true}]
  }
);

// Virtual for book's URL
TrackSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

//Export model
module.exports = mongoose.model('Track', TrackSchema);