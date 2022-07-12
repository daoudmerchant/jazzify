require('dotenv').config();
const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
const Track = require("../models/track");
// const Artist = require("../models/artist")

const query = cb => async params => {
    await mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true , useUnifiedTopology: true});
    console.log("MongoDB connected");
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    try {
        const result = await Promise.race([cb(params), new Promise((_, rej) => setTimeout(() => rej(new Error("Timed out")), 10000))]);
        await mongoose.connection.close();
        console.log("MongoDB disconneted");
        return result;
    } catch(e) {
        await mongoose.connection.close();
        console.log(e.message);
    }
}


module.exports.getTracks = query(async (instruments) => {
    const instrumentArray = Array.isArray(instruments) ? instruments : [instruments];
    return await Track.find({ instruments: { $all: instrumentArray }}).populate('artists').exec();
})

// module.exports.getArtists = query(async (idString) => {
//     const result = await Track.findOne({_id: new ObjectId(idString)}).exec();
//     console.log(result)
// })