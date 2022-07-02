const Schema = mongoose.Schema;

const ArtistSchema = new Schema(
  {
    instrument: {type: String, required: true},
    tracks: [{type: Schema.Types.ObjectId, ref: 'Track', required: true}]
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