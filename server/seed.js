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
    },
    {
        name: "Miles Davis",
        instrument: "trumpet"
    },
    {
        name: "Cannonball Adderley",
        instrument: "saxophone"
    },
    {
      name: "John Coltrane",
      instrument: "saxophone"
    },
    {
      name: "Wynton Kelly",
      instrument: "piano"
    },
    {
      name: "Paul Chambers",
      instrument: "bass",
    },
    {
      name: "Jimmy Cobb",
      instrument: "drums"
    },
    {
      name: "Art Blakey",
      instrument: "drums"
    },
    {
      name: "Freddie Hubbard",
      instrument: "trumpet",
    },
    {
      name: "Curtis Fuller",
      instrument: "trombone"
    },
    {
      name: "Wayne Shorter",
      instrument: "saxophone"
    },
    {
      name: "Cedar Walton",
      instrument: "piano"
    },
    {
      name: "Reggie Workman",
      instrument: "bass"
    },
    {
      name: "Art Tatum",
      instrument: "piano"
    },
    {
      name: "Ben Webster",
      instrument: "saxophone",
    },
    {
      name: "Red Callender",
      instrument: "bass"
    },
    {
      name: "Bill Douglass",
      instrument: "drums"
    },
    {
      name: "Herbie Hancock",
      instrument: "piano"
    },
    {
      name: "Joe Henderson",
      instrument: "saxophone"
    },
    {
      name: "Garnett Brown",
      instrument: "trombone"
    },
    {
      name: "John Coles",
      instrument: "trumpet"
    },
    {
      name: "Buster Williams",
      instrument: "bass"
    },
    {
      name: 'Albert "Tootie" Heath',
      instrument: "drums"
    },
    {
      name: "Wynton Marsalis",
      instrument: "trumpet"
    },
    {
      name: "Branford Marsalis",
      instrument: "saxophone"
    },
    {
      name: "Kenny Kirkland",
      instrument: "piano"
    },
    {
      name: "Charnett Moffett",
      instrument: "bass"
    },
    {
      name: 'Jeff "Tain" Watts',
      instrument: "drums"
    },
    {
      name: "Peter Bernstein",
      instrument: "guitar"
    },
    {
      name: "Sullivan Fortner",
      instrument: "piano"
    },
    {
      name: "Peter Washington",
      instrument: "bass"
    },
    {
      name: "Joe Farnsworth",
      instrument: "drums"
    },
    {
      name: "Massimo Biolcati",
      instrument: "bass"
    },
    {
      name: "Lionel Loueke",
      instrument: "guitar"
    },
    {
      name: "Gretchen Parlato",
      instrument: "vocals"
    },
    {
      name: "Aaron Parks",
      instrument: "piano"
    },
    {
      name: "Louis Armstrong",
      instrument: "trumpet"
    },
    {
      name: "Herb Ellis",
      instrument: "guitar"
    },
    {
      name: "Louis Bellson",
      instrument: "drums"
    }

]
const seedTracks = [
  {
    uri: "6PmKatJs99z0fDXi9624pk", // That Old Feeling, Louis Armstrong and Oscar Peterson
    instruments: ["vocals", "piano", "guitar", "bass", "drums"],
    artists: ["Louis Armstrong", "Oscar Peterson", "Herb Ellis", "Ray Brown", "Louis Bellson"]
  },
  {
    uri: "66lPgenfvsvf3UBgTEhIML", // Flor de Lis, Gretchen Parlato
    instruments: ["vocals", "piano", "guitar", "bass"],
    artists: ["Gretchen Parlato", "Lionel Loueke", "Aaron Parks", "Massimo Biolcati"]
  },
  {
    uri: "11hoxqUWlEbxsP39AdwEty", // Simple as That, Peter Bernstein
    instruments: ["guitar", "piano", "bass", "drums"],
    artists: ["Peter Bernstein", "Sullivan Fortner", "Peter Washington", "Joe Farnsworth"]
  },
  {
    uri: "7JwB1NWTYssyIx9UQtnKd0", // Delfeayo's Dilemma, Wynton Marsalis
    instruments: ["trumpet", "saxophone", "piano", "bass", "drums"],
    artists: ["Wynton Marsalis", "Branford Marsalis", "Kenny Kirkland", "Charnett Moffett", 'Jeff "Tain" Watts']
  },
  {
    uri: "2akqjwBZxyDIEJEJXq4Cvx", // Wiggle Waggle, Herbie Hancock
    instruments: ["saxophone", "trumpet", "trombone", "piano", "bass", "drums", "guitar"],
    artists: ["Herbie Hancock", "Joe Henderson", "Garnett Brown", "John Coles", "Buster Williams", 'Albert "Tootie" Heath']
  },
  {
    uri: "3sT3JEJs0I2F04d8uo1pgN", // Night and Day, Ben Webster and Art Tatum
    instruments: ["saxophone", "piano", "bass", "drums"],
    artists: ["Art Tatum", "Ben Webster", "Red Callender", "Bill Douglass"]
  },
  {
    uri: "41K9UjuokxVxCXQT5ug8ps",   // Terra Nova, Kurt Rosenwinkel
    instruments: ["guitar", "saxophone", "piano", "bass", "drums"],
    artists: ["Kurt Rosenwinkel", "Mark Turner", "Aaron Goldberg", "Ben Street", "Eric Harland"]
  },
  {
    uri: "69enZcR3Rr9Bg3fNzHEp9y",   // Things Ain't What They Used To Be, Oscar Peterson
    instruments: ["piano", "bass", "drums"],
    artists: ["Oscar Peterson", "Ray Brown", "Ed Thigpen"]
  },
  {
    uri: "7p9XA9tTuQrhG4pEuCJ7qx", // On the Ginza, Art Blakey
    instruments: ["trumpet", "saxophone", "trombone", "piano", "bass", "drums"],
    artists: ["Art Blakey", "Freddie Hubbard", "Curtis Fuller", "Wayne Shorter", "Cedar Walton", "Reggie Workman"]
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