require('dotenv').config();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Track = require("../models/track");

module.exports.getTracks = async (instruments) => {
    const instrumentArray = Array.isArray(instruments) ? instruments : [instruments];
    return await Track.find({ instruments: { $all: instrumentArray}}).exec();
}

module.exports.getArtists = async (idString) => {
    const query = await Track.findOne({_id: new ObjectId(idString)}).exec();
    console.log(query)
}