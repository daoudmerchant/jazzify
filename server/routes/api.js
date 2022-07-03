const express = require('express');
const router = express.Router();
const db = require("../db/dbAPI")


router.get('/tracks', async (req, res) => {
  const query = await db.getTracks(req.query.instruments);
  res.json(query);
});

router.get('/tracks/:id', async (req, res) => {
    const query = await db.getArtists(req.params.id);
    res.json(query);
});

module.exports = router;
