const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackSchema = new Schema(
  {
    uri: {type: String, required: true},
    instruments: [{type: String, required: true}],
    artists: [{type: Schema.Types.ObjectId, ref: "Artist", required: true}]
  }
);

module.exports = mongoose.model('Track', TrackSchema);