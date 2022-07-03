const mongoose = require("mongoose");
const Artist = require("./models/artist");
const Track = require("./models/track");
require("dotenv").config();

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection open"))
  .catch(console.error);
const seedArtists = [
    {
        name: "Kurt Rosenwinkel",
        instrument: "electric guitar",
    },
    {
        name: "Mark Turner",
        instrument: "saxophone",
    },
    {
        name: "Aaron Goldberg",
        instrument: "piano",
    },
    {
        name: "Ben Street",
        instrument: "double bass",
    },
    {
        name: "Eric Harland",
        instrument: "drums",
    },
    {
        name: "Oscar Peterson",
        instrument: "piano",
    },
    {
        name: "Ray Brown",
        instrument: "double bass",
    },
    {
        name: "Ed Thigpen",
        instrument: "drums",
    },
    {
        name: "Kurt Rosenwinkel",
        instrument: "electric guitar",
    },
    {
        name: "Kurt Rosenwinkel",
        instrument: "electric guitar",
    },
]
const seedTracks = [
  {
    uri: "41K9UjuokxVxCXQT5ug8ps?si=87aefad2c36148ab",   // Terra Nova, Kurt Rosenwinkel
    artists: ["Kurt Rosenwinkel", "Mark Turner", "Aaron Goldberg", "Ben Street", "Eric Harland"]
  },
  {
    uri: "69enZcR3Rr9Bg3fNzHEp9y?si=0f4c35a0695e46f4",   // Things Ain't What They Used To Be, Oscar Peterson
    artists: ["Oscar Peterson", "Ray Brown", "Ed Thigpen"]
  }
];
const seedDB = async () => {
  await Artist.deleteMany({});
  console.log("Artists purged");
  const seededArtists = await Artist.insertMany(seedArtists);
  console.log("Artists inserted");
  const seedTracksWithIds = seedTracks.map((track) => ({
    uri: track.uri,
    artists: track.artists
        .map(artist => seededArtists.find((seededArtist => seededArtist.name === artist))._id)
  }))
  await Track.deleteMany({});
  console.log("Tracks purged");
  await Track.insertMany(seedTracksWithIds);
  console.log("Tracks inserted");
  const populatedTracks = await Track.find().populate('Artist');
  console.log(populatedTracks);
};
seedDB()
  .then(() => {
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  })
  .catch((err) => console.error(err));