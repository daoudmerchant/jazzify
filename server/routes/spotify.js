const express = require('express');
require('dotenv').config();

const router = express.Router();

router.get('/login', (_, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri: 'http://localhost:3000/',
      state: Math.random() * 1e16
    }));
});

module.exports = router;