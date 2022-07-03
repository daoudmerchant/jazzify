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
        instrument: "guitar",
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
        instrument: "bass",
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
        instrument: "bass",
    },
    {
        name: "Ed Thigpen",
        instrument: "drums",
    }
]
const seedTracks = [
  {
    uri: "41K9UjuokxVxCXQT5ug8ps",   // Terra Nova, Kurt Rosenwinkel
    instruments: ["guitar", "saxophone", "piano", "bass", "drums"],
    artists: ["Kurt Rosenwinkel", "Mark Turner", "Aaron Goldberg", "Ben Street", "Eric Harland"]
  },
  {
    uri: "69enZcR3Rr9Bg3fNzHEp9y",   // Things Ain't What They Used To Be, Oscar Peterson
    instruments: ["piano", "bass", "drums"],
    artists: ["Oscar Peterson", "Ray Brown", "Ed Thigpen"]
  }
];
const seedDB = async () => {
  try {
    await Artist.deleteMany({});
    console.log("Artists purged.");
    const seededArtists = await Artist.insertMany(seedArtists);
    console.log("Artists seeded.")
    const seedTracksWithArtistIds = seedTracks.map(({uri, artists, instruments}) => ({
        uri,
        instruments,
        artists: artists.map(artist => seededArtists.find(seededArtist => seededArtist.name === artist)._id)
    }))
    await Track.deleteMany({});
    console.log("Tracks purged.");
    await Track.insertMany(seedTracksWithArtistIds);
    console.log("Tracks seeded.")
  } catch (e) {
    console.error(e.message);
  }
};
seedDB()
  .then(() => {
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  })
  .catch((err) => console.error(err));